const MarketPlaceMigrations = artifacts.require("CourseMarketplace");

module.exports = function (deployer) {
  deployer.deploy(MarketPlaceMigrations);
};
