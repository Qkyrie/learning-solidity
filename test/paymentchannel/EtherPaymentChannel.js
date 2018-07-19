const PaymentChannel = artifacts.require("./paymentchannel/EtherPaymentChannel.sol")

import chai from 'chai';
const expect = chai.expect;
require('truffle-test-utils').init();

contract('EtherPaymentChannel', function(accounts) {

    const sender = accounts[0];
    const receiver = accounts[0];

    it('should correctly set the initial values', async () =>  {

        let paymentChannel = await PaymentChannel.new(sender, receiver, 0);

        expect(await paymentChannel.receiver()).to.equal(sender);
        expect(await paymentChannel.sender()).to.equal(receiver);
        expect((await paymentChannel.deadline()).toNumber()).to.equal(0);
        expect(await paymentChannel.open()).to.be.true;
    });

    it('should be possible to close after the deadline was met', async () => {
        let paymentChannel = await PaymentChannel.new(sender, receiver, 0);

        let close = await paymentChannel.close();

        assert.web3Event(close, {
            event: 'Closed'
        }, "Closed event was emitted");
    })
})