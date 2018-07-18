
pragma solidity ^0.4.24;

/*
 * Reference implementation of a payment channel.
 * @author Quinten De Swaef
 */
contract PaymentChannel {

    address public receiver;
    address public sender;
    uint public deadline;

    constructor(address _sender, address _receiver, uint _deadline) {
        receiver = _receiver;
        sender = _sender;
        deadline = _deadline;
    }

    function submitProof() external returns (bool) {
        return true;
    }

    function close() external returns (bool) {
        require(now > deadline, "deadline has not been reached yet");
        require(sender.send(address(this).balance));
        return true;
    }
}