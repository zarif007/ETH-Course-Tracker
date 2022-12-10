const SemesterContract = artifacts.require("SemesterContract");

module.exports = function (deployer) {
  deployer.deploy(SemesterContract);
};
