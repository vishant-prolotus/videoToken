var DigitalToken = artifacts.require("./digitalToken.sol");

module.exports = function(deployer) {

  deployer.deploy(DigitalToken,"Sofo",0,"♦",{gas: 4500000});
};
