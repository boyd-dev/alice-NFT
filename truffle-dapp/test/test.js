const SimpleStorage = artifacts.require("SimpleStorage");

contract ("SimpleStorage Test", function () {

    before(async () => {
        this.instance = await SimpleStorage.deployed();
    });


    it ("Should change the value", async () => {

        await this.instance.set(500);
        const val  = await this.instance.get.call();
        assert.equal(500, val, "The result is incorrect!");

    });


    it ("Should emit the event", async () => {

        const expectedEvent = ["Change", "set", "2000"];

        const result = await this.instance.set(2000);
        const logs = result.receipt.logs[0]; 
        const receivedEvent = [logs.event, logs.args.message, logs.args.newVal.toString()];
        
        assert.isOk(JSON.stringify(expectedEvent) === JSON.stringify(receivedEvent));

    });    


    it ("Should be failed if the value greater than 5K", async () => {

        let err = null;
        try {

            await this.instance.set(10000);            

        } catch ( error ) {
            err = error;

            if (error.message !== null && error.message.length > 0) {
                var reason = error.message.match(/Reason given: (.*)\./);                
            }
            
        }

        assert.isOk(err instanceof Error, "The value exceeds the limit");
        assert.equal(reason[1], "Should be less than 5000");
    });

})
