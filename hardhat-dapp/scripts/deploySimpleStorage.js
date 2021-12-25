const hre = require("hardhat");

async function main() {
    const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
    const signers = await hre.ethers.getSigners();
    
    const ss = await SimpleStorage.connect(signers[1]).deploy(500);
    await ss.deployed();
    
    console.log("SimpleStorage eployed to:", ss.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
