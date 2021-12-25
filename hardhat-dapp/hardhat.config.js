require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ganache");
require("hardhat-deploy");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const keys = ["ca...cfa"];

module.exports = {
  
  defaultNetwork : "development",
  networks: {
    development: {
      url: "http://localhost:7545",
      chainId: 1337
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/...MCb",
      accounts: keys
    }
  },
  
  solidity: "0.8.4",
  
  namedAccounts: {
    deployer: {
      development: 0,
      rinkeby: "0xAF...c08a"
    }
  },
  
  
  etherscan: {
    apiKey: ""
  }
  
  
};
