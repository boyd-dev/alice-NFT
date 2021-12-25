module.exports = async ({deployments, getNamedAccounts}) => {
    
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    
     const result = await deploy("SimpleStorage", {
        from: deployer,
        args: [500],
     });
     
     console.log(`Contract address = ${result.address}`);
};

module.exports.tags = ['simple'];
