const Certy = artifacts.require('Certy');

module.exports = async function(deployer){
    await deployer.deploy(Certy)
};