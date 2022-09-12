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
  function purchaseCourse(bytes16 courseId, bytes32 proof) external payable {
    /**
        - abi.encodePacked(courseId, msg.sender) => simply concatenates courseId & sender address together
        - keccak256 encodes the concatenated courseId & sender address to generate the final course hash
     */
    bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
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
}

/**
  Commands:
    - const instance = await CourseMarketplace.deployed();
    - instance.purchaseCourse("0x00000000000000000000000000003130","0x0000000000000000000000000000313000000000000000000000000000003130")
 */
