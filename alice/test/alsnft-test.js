const hre = require("hardhat");
const { deployContract, provider } = hre.waffle;
const {expect, assert} = require("chai");

const ALSnft = require("../artifacts/contracts/ALSnft.sol/ALSnft.json");

const ERC721IFID = "0x80ac58cd";
const ERC165IFID = "0x01ffc9a7";
const ERC721ReceivedIFID = "0x150b7a02";

const tokenURI1 = "ipfs://bafyreiftobth2biln3kbpqvxcvub7kiq7hln2ix6xbd5luuzupbbapsomu/metadata.json";
const tokenURI2 = "ipfs://bafyreidz2dtb2uclkp3nbprayzv3kkl7cvwxuzwjbqkqs5n3urnlve3u6e/metadata.json";
const tokenURI3 = "ipfs://bafyreiaid3as357c5fnbbzvyxj2eieyrkydtjargvbtnk3wt5ygn6fx7xi/metadata.json";


describe("ALS NFT Test", async () => {
    
    const [deployer, james, mary, approved] = provider.getWallets();
    
    before(async () => {
        
        this.instance = await deployContract(deployer, ALSnft);
        //const f = await hre.ethers.getContractFactory("ALSnft");
        //this.instance = await f.deploy();

        
    });
    
    it ("Should implement ERC-721 and ERC-165", async () => {
        const v1 = await this.instance.supportsInterface(ERC721IFID);
        const v2 = await this.instance.supportsInterface(ERC165IFID);
        
        assert.isOk(v1&&v2);
    });
    
    it ("Should mint the 1st ALS", async () => {

        await this.instance.mint(deployer.address, 1, tokenURI1);
        await this.instance.mint(deployer.address, 2, tokenURI2);
        await this.instance.mint(deployer.address, 3, tokenURI3);

        const v = await this.instance.ownerOf(1);
        assert.equal(v, deployer.address, "Not the same address");
    });

    
    it ("Should revert when token ID does not exist", async () => {
        await expect(this.instance.ownerOf(100))
            .to.be.reverted;
    });
    
    
    it ("Should have the balance", async () => {
        const v = await this.instance.balanceOf(deployer.address);
        expect(v).to.equal(3);
    });
    
    
    it ("Should have the right token URI", async () => {
        const v = await this.instance.tokenURI(1);
        assert.equal(v, tokenURI1, "Wrong TokenURI");
    });
    
    it ("Should revert when minting by anyone", async () => {
        await expect(this.instance.connect(james).mint(james.address, 1, tokenURI1))
            .to.be.reverted;
    });
    
    
    context("Transfer Test", async () => {
    
        it ("Should revert if the recipient is zero address", async () => {
            await expect(this.instance.connect(james).transferFrom(deployer.address, "0x0", 1))
                .to.be.reverted
        });
    
        it ("Should revert if invalid token owner", async () => {
            await expect(this.instance.connect(james).transferFrom(deployer.address, mary.address, 1))
                .to.be.reverted
        });
    
        it.skip ("Should transfer the token to new owner", async () => {

            await this.instance.transferFrom(deployer.address, mary.address, 1);
            const v = await this.instance.ownerOf(1);

            const b1 = await this.instance.balanceOf(mary.address);
            const b2 = await this.instance.balanceOf(deployer.address);

            assert(v === mary.address, "Failed to transfer");
            assert(b1.eq(hre.ethers.BigNumber.from("1")));
            assert(b2.eq(hre.ethers.BigNumber.from("2")));

        });
    
        it ("Should emit Transfer event when transfer", async () => {
            await expect(this.instance.transferFrom(deployer.address, mary.address, 1))
                .to.emit(this.instance, "Transfer");
        });
    
        it ("Should revert transfer token to contract", async () => {
            //await expect(this.instance.connect(mary).functions['safeTransferFrom(address,address,uint256)'](mary.address, this.Mock.address, 1))
            await expect(
                this.instance.connect(james)['safeTransferFrom(address,address,uint256)']
                (mary.address, james.address, 1))
                .to.be.reverted;
        });

    });
    
    context("Approve Test", async () => {
        
        it ("Can approve the ownership to operator", async () => {
            await this.instance.approve(approved.address, 2);
            const v = await this.instance.getApproved(2);
            assert(v, approved.address, "Wrong approved operator");
        });
    
        it ("Can transfer the token by the operator", async () => {
            await this.instance.connect(approved).transferFrom(deployer.address, mary.address, 2);
            const v = await this.instance.ownerOf(2);
            assert(v === mary.address, "Failed to transfer");
        });
    
    
        it ("Can revoke the ownership from approved", async () => {
            await this.instance.setApprovalForAll(approved.address, false);
            const v = await this.instance.isApprovedForAll(deployer.address, approved.address)
            expect(v).to.be.false;
        });
    
    });
    
});
