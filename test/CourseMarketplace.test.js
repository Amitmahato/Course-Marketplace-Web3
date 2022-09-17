// Run test with `truffle test`

const CourseMarketplace = artifacts.require("CourseMarketplace");

contract("CourseMarketplace", (accounts) => {
  let _contract = null;
  let contractOwner = null; // accounts[0] => 0x24f968F05696b1F7322A8772f76eF46Bb3D38414
  let buyer = null; // accounts[0] => 0x1631d6e4b2921Bd8A78B32CC77eF57F231F8F7B2

  before(async () => {
    _contract = await CourseMarketplace.deployed();
    contractOwner = accounts[0];
    buyer = accounts[1];

    console.log(contractOwner);
    console.log(buyer);
    console.log(_contract);
  });

  describe("Purchase a new course", () => {
    it("should console.log", () => {
      console.log("Purchase a course");
    });
  });
});
