// Run test with `truffle test`

const { catchRevert } = require("./utils/exception");
const CourseMarketplace = artifacts.require("CourseMarketplace");

const getBalance = async (address) => await web3.eth.getBalance(address);
const toBN = (value) => web3.utils.toBN(value);
const getGasFee = async (result) => {
  const transaction = await web3.eth.getTransaction(result.tx);
  return toBN(transaction.gasPrice).mul(toBN(result.receipt.gasUsed));
};

contract("CourseMarketplace", (accounts) => {
  const courseId = "0x00000000000000000000000000003130";
  const proof =
    "0x0000000000000000000000000000313000000000000000000000000000003130";

  const course2Id = "0x00000000000000000000000000003131";
  const proof2 =
    "0x0000000000000000000000000000313100000000000000000000000000003131";

  const value = "900000000"; // 0.9 ETH

  let _contract = null;
  let contractOwner = null; // accounts[0] => 0x24f968F05696b1F7322A8772f76eF46Bb3D38414
  let buyer = null; // accounts[0] => 0x1631d6e4b2921Bd8A78B32CC77eF57F231F8F7B2
  let courseHash;

  before(async () => {
    _contract = await CourseMarketplace.deployed();
    contractOwner = await _contract.getContractOwner();
    buyer = accounts[1];
  });

  describe("Purchase a new course", () => {
    before(async () => {
      await _contract.purchaseCourse(courseId, proof, {
        from: buyer,
        value,
      });
    });

    it("should get the purchased course at index", async () => {
      const index = 0;
      courseHash = await _contract.getCourseHashAtIndex(index);

      const expectedHash = web3.utils.soliditySha3(
        {
          type: "bytes16",
          value: courseId,
        },
        {
          type: "bytes20",
          value: buyer,
        }
      );

      assert.equal(
        courseHash,
        expectedHash,
        "Course hash doesn't match with the hash of the purchased course!"
      );
    });

    it("should match the purchase data of the course purchased by the buyer", async () => {
      const expectedIndex = 0;
      const expectedState = 0;

      const course = await _contract?.getCourseByHash(courseHash);

      assert.equal(
        course.id,
        expectedIndex,
        `Purchased course index should be ${expectedIndex}`
      );
      assert.equal(
        course.price,
        value,
        `Purchased course price should be ${value}`
      );
      assert.equal(
        course.proof,
        proof,
        `Purchased proof price should be ${proof}`
      );
      assert.equal(
        course.owner,
        buyer,
        `Purchased course buyer should be ${buyer}`
      );
      assert.equal(
        course.state,
        expectedState,
        `Purchase course state should be ${expectedState}`
      );
    });

    it("should not allow re-purchase already owned course", async () => {
      await catchRevert(
        _contract.purchaseCourse(courseId, proof, {
          from: buyer,
          value,
        })
      );
    });
  });

  describe("Activate the purchased course 👆👆👆", () => {
    it("should not be able to activate the purchased course", async () => {
      await catchRevert(
        _contract.activateCourse(courseHash, {
          from: buyer,
        })
      );
    });

    it("should have 'activated' status for the purchased course", async () => {
      const expectedState = 1;

      await _contract.activateCourse(courseHash, {
        from: contractOwner,
      });

      const course = await _contract?.getCourseByHash(courseHash);

      assert.equal(
        course.state,
        expectedState,
        `Purchase course state should be ${expectedState} - activated`
      );
    });
  });

  describe("Transfer contract ownership", () => {
    it("should not be able to transfer contract ownership", async () => {
      await catchRevert(
        _contract.transferOwnership(buyer, {
          from: buyer,
        })
      );
    });

    it("should be able to transfer contract ownership to buyer", async () => {
      await _contract.transferOwnership(buyer, {
        from: contractOwner,
      });

      const owner = await _contract.getContractOwner();

      assert(owner === buyer, `Contract owner should be the buyer`);
      assert(
        owner !== contractOwner,
        `Contract owner should not be the initial owner`
      );
    });

    it("should be able to transfer contract ownership to initial owner", async () => {
      await _contract.transferOwnership(contractOwner, {
        from: buyer,
      });

      const owner = await _contract.getContractOwner();

      assert(owner !== buyer, "Contract owner should not be the buyer");
      assert(
        owner === contractOwner,
        "Contract owner should be set to the initial owner"
      );
    });
  });

  describe("Purchase & Deactivate the recently purchased course", () => {
    let courseHash;

    before(async () => {
      await _contract.purchaseCourse(course2Id, proof2, {
        from: buyer,
        value,
      });
      courseHash = await _contract.getCourseHashAtIndex(1);
    });

    it("should not be able to deactivate the purchased course by the buyer", async () => {
      await catchRevert(
        _contract.deactivateCourse(courseHash, {
          from: buyer,
        })
      );
    });

    it("should be able to deactivate the purchased course by the contract owner", async () => {
      await _contract.deactivateCourse(courseHash, {
        from: contractOwner,
      });
    });

    it("should have the course price 0 and state 2", async () => {
      const expectedState = 2;
      const expectedPrice = 0;

      const course = await _contract.getCourseByHash(courseHash);

      assert.equal(
        course.state,
        expectedState,
        "Course should have the state of deactivated"
      );
      assert.equal(
        course.price,
        expectedPrice,
        "Deactivated course price should be set to zero"
      );
    });

    it("should not be able to activate the deactivated course", async () => {
      await catchRevert(
        _contract.activateCourse(courseHash, { from: contractOwner })
      );
    });
  });

  describe("Repurchase course the deactivated course 👆👆👆", () => {
    let courseHash = null;

    before(async () => {
      courseHash = await _contract.getCourseHashAtIndex(1);
    });

    it("should not allow repurchase of a non-existing course", async () => {
      const notExistingCourseHash =
        "0x5ceb3f8075c3dbb5d490c8d1e6c950302ed065e1a9031750ad2c6513069e3fc3";
      await catchRevert(
        _contract.repurchaseCourse(notExistingCourseHash, { from: buyer })
      );
    });

    it("should not allow repurchase the course which is not already owned by the sender", async () => {
      await catchRevert(
        _contract.repurchaseCourse(courseHash, { from: contractOwner })
      );
    });

    it("should be able repurchase the course by the original buyer", async () => {
      const exptectedState = 0;

      const balanceBeforeTransaction = await getBalance(buyer);
      const contractBalanceBeforeTransaction = await getBalance(
        _contract.address
      );

      const result = await _contract.repurchaseCourse(courseHash, {
        from: buyer,
        value,
      });

      const gasFee = await getGasFee(result);

      const balanceAfterTransaction = await getBalance(buyer);
      const contractBalanceAfterTransaction = await getBalance(
        _contract.address
      );

      assert.equal(
        toBN(balanceBeforeTransaction).sub(toBN(value)).sub(gasFee).toString(),
        balanceAfterTransaction,
        "Buyer balance should not be same before & after purchasing the course"
      );

      assert.equal(
        toBN(contractBalanceBeforeTransaction).add(toBN(value)),
        contractBalanceAfterTransaction,
        "Contract balance should before transaction should increase by the amount of course price after the transaction"
      );

      const course = await _contract.getCourseByHash(courseHash);

      assert.equal(
        course.state,
        exptectedState,
        "The course is not in purchased state"
      );
      assert.equal(
        course.price,
        value,
        `The course price is not equal to ${value}`
      );
    });

    it("should not be able to repurchase the purchased course", async () => {
      await catchRevert(
        _contract.repurchaseCourse(courseHash, { from: buyer })
      );
    });
  });
});
