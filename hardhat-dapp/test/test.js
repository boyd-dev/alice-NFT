const {expect, assert} = require("chai");
const hre = require("hardhat");

const addr = "0xf1b5c54d3F13bf58734acF6AE7E32FFb24fe616F";
describe ("SimpleStorage Test", function () {
    
    before(async () => {
        const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
        this.instance = await SimpleStorage.attach(addr);
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
    
    // revert reason
    it("Should revert", async () => {
        await expect(this.instance.set(10000))
            .to.be.revertedWith("Should be less than 5000");
    });
    
})
