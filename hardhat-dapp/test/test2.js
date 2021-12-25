const hre = require("hardhat");
const { deployContract, provider } = hre.waffle;
const {expect, assert} = require("chai");

const SimpleStorage = require("../artifacts/contracts/SimpleStorage.sol/SimpleStorage.json");

describe ("SimpleStorage Test", function () {
    
    before(async () => {
        const signers = provider.getSigner();
        this.instance = await deployContract(signers, SimpleStorage, [500]);
    });
    
    it ("Should have the initial value", async () => {
        const v = await this.instance.get();
        assert.equal(v.toString(), 500);
    });
    
    it("Should change the value", async () => {
        
        await this.instance.set(2000);
        const v  = await this.instance.get();
        assert.equal(v, 2000);
    });
    
    it("Should emit the event by set", async () => {
        
        const v = 500;
        await expect(this.instance.set(v))
            .to.emit(this.instance, "Change")
            .withArgs("set", v);
    });
    
    it("Should revert", async () => {
        await expect(this.instance.set(10000))
            .to.be.revertedWith("Should be less than 5000");
    });
    
})
