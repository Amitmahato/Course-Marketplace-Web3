// Run test with `truffle test`

const CourseMarketplace = artifacts.require("CourseMarketplace");

contract("CourseMarketplace", (accounts) => {
  const courseId = "0x00000000000000000000000000003130";
  const proof =
    "0x0000000000000000000000000000313000000000000000000000000000003130";
  const value = "900000000"; // 0.9 ETH

  let _contract = null;
  let contractOwner = null; // accounts[0] => 0x24f968F05696b1F7322A8772f76eF46Bb3D38414
  let buyer = null; // accounts[0] => 0x1631d6e4b2921Bd8A78B32CC77eF57F231F8F7B2

  before(async () => {
    _contract = await CourseMarketplace.deployed();
    contractOwner = accounts[0];
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
      const courseHash = await _contract.getCourseHashAtIndex(index);

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
  });
});
