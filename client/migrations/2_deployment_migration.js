var Certy = artifacts.require("Certy");

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(Certy);
};
