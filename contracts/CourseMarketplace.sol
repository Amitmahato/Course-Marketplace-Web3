// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CourseMarketplace {
  enum State {
    Purchased,
    Activated,
    Deactivated
  }

  struct Course {
    uint256 id; // default to uint256 - 32 bytes (slot 1)
    uint256 price; // 32 bytes (slot 2)
    /**
     * 8 * 32 = 256 bits hexadecimal characters,
     * keccak256 encoded that is unique to the user, purchaser of the course
     */
    bytes32 proof; // 32 bytes (slot 3)
    // user who has purchased the course
    address owner; // 20 bytes (slot 4)
    State state; // 1 byte (slot 4)
  }

  // Course Hash maps to Course
  mapping(bytes32 => Course) private ownedCourses;

  // Course Id maps to Course Hash
  mapping(uint256 => bytes32) private ownedCoursesHash;

  // total number of courses owned
  uint256 private totalOwnedCourses; // defaults to a value of zero

  address payable private owner;

  bool public isStopped = false;

  constructor() {
    setContractOwner(msg.sender);
  }

  /**
      Comments made after `///` just above the error declaration 
      is considered as the error message for the given error
   */
  /// You already own the selected course!
  error CourseHasOwner();

  /// You do not own the selected course!
  error CourseNotOwned();

  /// Only owner has the access!
  error OnlyOwner();

  /// Course doesn't exist!
  error CourseNotFound();

  /// Course should be in purchase or deactivated state to be activated!
  error InvalidCourseState();

  modifier onlyOwner() {
    if (msg.sender != owner) {
      revert OnlyOwner();
    }
    _;
  }

  modifier onlyWhenRunning() {
    require(!isStopped);
    _;
  }

  modifier onlyWhenStopped() {
    require(isStopped);
    _;
  }

  function setContractOwner(address newOwner) private {
    owner = payable(newOwner);
  }

  function stopContract() external onlyOwner {
    isStopped = true;
  }

  function resumeContract() external onlyOwner {
    isStopped = false;
  }

  /**
     Simply defining the `receive` pre-existing function will allow sending ether to the contract, 
     absence of this won't allow contract to receive any ether
   */
  receive() external payable {}

  /**
    Owner can withdraw the desired amount to their account
   */
  function withdraw(uint256 amount) external onlyOwner {
    (bool success, ) = owner.call{value: amount}("");
    require(
      success,
      "Transfer of ether from the contract to the contract owner account failed"
    );
  }

  /**
    Emergency withdraw of all the contract's balance to the owner's account is allowed only when the contract is already stopped
   */
  function emergencyWithdraw() external onlyWhenStopped onlyOwner {
    (bool success, ) = owner.call{value: address(this).balance}("");
    require(
      success,
      "Transfer of ether from the contract to the contract owner account failed"
    );
  }

  /**
    This will self destruct the contract and 
    transfer the balance of the contract to the address provided, 
    which here is the address of the contract owner
   */
  function selfDestruct() external onlyWhenStopped onlyOwner {
    selfdestruct(owner);
  }

  function hasCourseOwnership(bytes32 courseHash) private view returns (bool) {
    Course memory course = ownedCourses[courseHash];
    return course.owner == msg.sender;
  }

  /**
    Example,
      - courseId  = 10 (ASCII) 
                  = 0x3130 (HEX) 
      => 16 bytes = 0x00000000000000000000000000003130 (32 characters)

      - address = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2 => 20 bytes (30 characters)

      - abi.encodePacked(courseId, msg.sender)
                  = 00000000000000000000000000003130Ab8483F64d9C6d1EcF9b849Ae677dD3315835cb2
      
      - keccak256(00000000000000000000000000003130Ab8483F64d9C6d1EcF9b849Ae677dD3315835cb2)
                  = ff97578d8dd58d484dac933924a0f06f3ff39cc2843610754dfebd8770f807e5
                  = courseHash
                  = ff97578d8dd58d484dac933924a0f06f3ff39cc2843610754dfebd8770f807e5 (Output received from purchaseCourse function when run with above parameters on remix editor)
      
      - let proof = courseId-courseId (16 + 16 = 32 bytes, random value as of now)
                  = 0x0000000000000000000000000000313000000000000000000000000000003130
   */
  function purchaseCourse(bytes16 courseId, bytes32 proof)
    external
    payable
    onlyWhenRunning
  {
    /**
        - abi.encodePacked(courseId, msg.sender) => simply concatenates courseId & sender address together
        - keccak256 encodes the concatenated courseId & sender address to generate the final course hash
     */
    bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));

    if (hasCourseOwnership(courseHash)) {
      revert CourseHasOwner();
    }

    uint256 id = totalOwnedCourses++;
    ownedCoursesHash[id] = courseHash;
    ownedCourses[courseHash] = Course({
      id: id,
      price: msg.value,
      proof: proof,
      owner: msg.sender,
      state: State.Purchased
    });
  }

  function repurchaseCourse(bytes32 courseHash)
    external
    payable
    onlyWhenRunning
  {
    if (!isCourseCreated(courseHash)) {
      revert CourseNotFound();
    }

    if (!hasCourseOwnership(courseHash)) {
      revert CourseNotOwned();
    }

    Course storage course = ownedCourses[courseHash];
    if (course.state != State.Deactivated) {
      revert InvalidCourseState();
    }

    course.state = State.Purchased;
    course.price = msg.value;
  }

  function activateCourse(bytes32 courseHash)
    external
    onlyWhenRunning
    onlyOwner
  {
    if (!isCourseCreated(courseHash)) {
      revert CourseNotFound();
    }

    Course storage course = ownedCourses[courseHash];

    if (course.state == State.Purchased) {
      course.state = State.Activated;
    } else {
      revert InvalidCourseState();
    }
  }

  function deactivateCourse(bytes32 courseHash)
    external
    onlyWhenRunning
    onlyOwner
  {
    if (!isCourseCreated(courseHash)) {
      revert CourseNotFound();
    }

    Course storage course = ownedCourses[courseHash];

    // if course is already activated there is no going back
    // if already deactivated no need to perform this transaction
    if (course.state != State.Purchased) {
      revert InvalidCourseState();
    }

    // transfer the amount received during course purchase back to the owner
    (bool success, ) = course.owner.call{value: course.price}("");
    require(success, "Transfer Failed");

    course.state = State.Deactivated;
    course.price = 0;
  }

  /**
   *  Get the total number of courses
   */
  function getCourseCount() external view returns (uint256) {
    return totalOwnedCourses;
  }

  /**
   *  Get the hash of the course at a given index
   */
  function getCourseHashAtIndex(uint256 index) external view returns (bytes32) {
    return ownedCoursesHash[index];
  }

  /**
   *  Get course detail for a given course hash
   */
  function getCourseByHash(bytes32 courseHash)
    external
    view
    returns (Course memory)
  {
    return ownedCourses[courseHash];
  }

  function transferOwnership(address newOwner) external onlyOwner {
    setContractOwner(newOwner);
  }

  function getContractOwner() public view returns (address) {
    return owner;
  }

  function isCourseCreated(bytes32 courseHash) private view returns (bool) {
    address adr = address(0x00);
    Course storage course = ownedCourses[courseHash];
    return course.owner != adr;
  }
}

/**
  Commands:
    - const instance = await CourseMarketplace.deployed();
    - await instance.purchaseCourse("0x00000000000000000000000000003130","0x0000000000000000000000000000313000000000000000000000000000003130", { from: accounts[1], value: 2000000000 });
    - (await instance.getCourseCount()).toString();
    - await instance.getCourseHashAtIndex(0);
    - await instance.getCourseByHash("0x54b70b6e9e56c766edcb9d5715690e437820188c9eb798fc4635e137262e30e5");
    
    // accounts[0] is the owner
    - await instance.getContractOwner();

    // accounts[1] becomes new owner
    - await instance.transferOwnership("0x1631d6e4b2921Bd8A78B32CC77eF57F231F8F7B2");

    // accounts[0] tries to transfer ownership to accounts[1], throws error since accounts[0] is no longer the owner to execute transferOwnership method
    - await instance.transferOwnership("0x1631d6e4b2921Bd8A78B32CC77eF57F231F8F7B2",{ from:"0x24f968F05696b1F7322A8772f76eF46Bb3D38414" });

    // activate the course
    - await instance.activateCourse("0x54b70b6e9e56c766edcb9d5715690e437820188c9eb798fc4635e137262e30e5");

    // stop the contract
    - await instance.stopContract();

    // resume the contract
    - await instance.resumeContract();

    // withdraw 1 ether from the contract to the owner's account 
    // Can be called only by the owner
    - await instance.withdraw("1000000000000000000");

    // emergency withdraw all balance from the contract to the owner's account 
    // only allowed when the contract is stopped and can be called only by the owner
    - await instance.emergencyWithdraw();

    // destroy the smart contract and transfer all tha balance to owner's account
    // only allowed when the contract is stopped and can be called only by the owner
    - await instance.selfDestruct();
 */
