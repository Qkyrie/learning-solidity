const PaymentChannel = artifacts.require("./paymentchannel/PaymentChannel.sol")

import chai from 'chai';
const expect = chai.expect;


contract('PaymentChannel', function(accounts) {

    const sender = accounts[0];
    const receiver = accounts[0];

    it('should correctly set the initial values', async function() {

        let paymentChannel = await PaymentChannel.new(sender, receiver, 0);

        expect(await paymentChannel.receiver()).to.equal(sender);
        expect(await paymentChannel.sender()).to.equal(receiver);
        expect((await paymentChannel.deadline()).toNumber()).to.equal(0);
        expect(await paymentChannel.open()).to.be.true;
    });
})