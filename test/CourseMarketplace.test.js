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

  describe("Activate the purchased course ????????????", () => {
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
      const balanceBeforeTransaction = await getBalance(buyer);
      const contractBalanceBeforeTransaction = await getBalance(
        _contract.address
      );
      const conractOwnerBalanceBeforeTransaction = await getBalance(
        contractOwner
      );

      const result = await _contract.deactivateCourse(courseHash, {
        from: contractOwner,
      });

      const gasFee = await getGasFee(result);

      const balanceAfterTransaction = await getBalance(buyer);
      const contractBalanceAfterTransaction = await getBalance(
        _contract.address
      );
      const conractOwnerBalanceAfterTransaction = await getBalance(
        contractOwner
      );

      assert.equal(
        toBN(balanceBeforeTransaction).add(toBN(value)).toString(),
        balanceAfterTransaction,
        "Buyer balance should not be same before & after purchasing the course"
      );

      assert.equal(
        toBN(contractBalanceBeforeTransaction).sub(toBN(value)),
        contractBalanceAfterTransaction,
        "Contract balance before transaction should increase by the amount of course price after the transaction"
      );

      // gas fee is paid by the contract owner and no the contract itself sub(gasFee)
      assert.equal(
        toBN(conractOwnerBalanceBeforeTransaction).sub(gasFee),
        conractOwnerBalanceAfterTransaction,
        "Gas fees should be deucted from the contract owner's account"
      );
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

  describe("Repurchase course the deactivated course ????????????", () => {
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

  describe("Receive Funds", () => {
    it("should have transacted funds", async () => {
      const contracBalanceBeforeTransaction = await getBalance(
        _contract.address
      );

      const value = "100000000000000000"; // 0.1 ether

      await web3.eth.sendTransaction({
        from: buyer,
        to: _contract.address,
        value,
      });

      const contracBalanceAfterTransaction = await getBalance(
        _contract.address
      );

      assert.equal(
        toBN(contracBalanceBeforeTransaction).add(toBN(value)).toString(),
        contracBalanceAfterTransaction.toString(),
        "Contract balance after transaction should be more than the balance before transaction"
      );
    });
  });

  describe("Normal Withdraw", () => {
    const fundsToDeposit = "100000000000000000"; // 0.1 ether
    const overlimitFunds = "999999999999999999999"; // 0.1 ether

    before(async () => {
      await web3.eth.sendTransaction({
        from: buyer,
        to: _contract.address,
        value: fundsToDeposit,
      });
    });

    it("should fail when withdrawing into non-owner address", async () => {
      const funds = "10000000000000000";
      await catchRevert(_contract.withdraw(funds, { from: buyer }));
    });

    it("should fail when withdrawing overlimit balance", async () => {
      await catchRevert(
        _contract.withdraw(overlimitFunds, { from: contractOwner })
      );
    });

    it("should withdraw balance from contract to the owner's account", async () => {
      const conractOwnerBalanceBeforeTransaction = await getBalance(
        contractOwner
      );

      const result = await _contract.withdraw(fundsToDeposit, {
        from: contractOwner,
      });

      const gasFee = await getGasFee(result);

      const conractOwnerBalanceAfterTransaction = await getBalance(
        contractOwner
      );

      assert.equal(
        toBN(conractOwnerBalanceBeforeTransaction)
          .add(toBN(fundsToDeposit))
          .sub(gasFee)
          .toString(),
        conractOwnerBalanceAfterTransaction.toString(),
        "Contract owner balance should increase after withdrawing ethers from contract"
      );
    });
  });

  describe("Emergency Withdraw", () => {
    const fundsToDeposit = "100000000000000000"; // 0.1 ether
    let currentOwner = null;

    before(async () => {
      await web3.eth.sendTransaction({
        from: buyer,
        to: _contract.address,
        value: fundsToDeposit,
      });
      currentOwner = await _contract.getContractOwner();
    });

    after(async () => {
      await _contract.resumeContract({ from: currentOwner });
    });

    it("should fail when contract is not stopped first", async () => {
      await catchRevert(_contract.emergencyWithdraw({ from: currentOwner }));
    });

    it("should stop the contract", async () => {
      await _contract.stopContract({ from: currentOwner });
    });

    it("should successfully withdraw all the balances to contract owner", async () => {
      const ownerBalanceBeforeTransaction = await getBalance(currentOwner);
      const contractBalanceBeforeTransaction = await getBalance(
        _contract.address
      );

      const reesult = await _contract.emergencyWithdraw({ from: currentOwner });
      const gasFee = await getGasFee(reesult);

      const ownerBalanceAfterTransaction = await getBalance(currentOwner);

      assert.equal(
        toBN(ownerBalanceBeforeTransaction)
          .sub(gasFee)
          .add(toBN(contractBalanceBeforeTransaction))
          .toString(),
        toBN(ownerBalanceAfterTransaction).toString(),
        "Owner balance should increase by the amount of contract balance"
      );
    });

    it("should have the balance of the contract made zero", async () => {
      const contractBalance = await getBalance(_contract.address);

      assert.equal(
        contractBalance,
        0,
        "Contract balance after transfering all funds to contract owner should become zero"
      );
    });
  });

  describe("Contract Self Destruct", () => {
    const fundsToDeposit = "100000000000000000"; // 0.1 ether
    let currentOwner = null;

    before(async () => {
      await web3.eth.sendTransaction({
        from: buyer,
        to: _contract.address,
        value: fundsToDeposit,
      });
      currentOwner = await _contract.getContractOwner();
    });

    it("should fail to destroy the contract when contract is not already stopped", async () => {
      await catchRevert(_contract.selfDestruct({ from: currentOwner }));
    });

    it("should stop the contract", async () => {
      await _contract.stopContract({ from: currentOwner });
    });

    it("should not have the code 0x before the contract is destroyed", async () => {
      const code = await web3.eth.getCode(_contract.address);

      assert(
        code !== "0x",
        "Contract should have the byte code not equal to 0x"
      );
    });

    it("should destroy the contract and transfer the funds in the contract to the onwner", async () => {
      const ownerBalanceBeforeTransaction = await getBalance(currentOwner);
      const contractBalanceBeforeTransaction = await getBalance(
        _contract.address
      );

      const reesult = await _contract.selfDestruct({ from: currentOwner });
      const gasFee = await getGasFee(reesult);

      const ownerBalanceAfterTransaction = await getBalance(currentOwner);

      assert.equal(
        toBN(ownerBalanceBeforeTransaction)
          .sub(gasFee)
          .add(toBN(contractBalanceBeforeTransaction))
          .toString(),
        toBN(ownerBalanceAfterTransaction).toString(),
        "Owner balance should increase by the amount of contract balance"
      );
    });

    it("should have the balance of the contract made zero", async () => {
      const contractBalance = await getBalance(_contract.address);

      assert.equal(
        contractBalance,
        0,
        "Contract balance after transfering all funds to contract owner should become zero"
      );
    });

    it("should have the code 0x after contract is destroyed", async () => {
      const code = await web3.eth.getCode(_contract.address);

      assert.equal(
        code,
        "0x",
        "Contract should have been destroyed but it doesn't seem so"
      );
    });
  });
});
