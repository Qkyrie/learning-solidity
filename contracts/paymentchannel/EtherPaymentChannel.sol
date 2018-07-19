
pragma solidity ^0.4.24;


/*
 * Reference implementation of a payment channel.
 * @author Quinten De Swaef
 */
contract EtherPaymentChannel {

    event Closed();

    address public receiver;
    address public sender;
    uint public deadline;

    bool public open = true;

    constructor(address _sender, address _receiver, uint _deadline) public payable {
        receiver = _receiver;
        sender = _sender;
        deadline = _deadline;
    }

    function submitProof(bytes32 _hash, uint8 _v, bytes32 _r, bytes32 _s, uint256 _amount) external returns (bool) {
        address signer = ecrecover(_hash, _v, _r, _s);
        require(signer == sender, "signer should match the sender of the payment channel");
        bytes32 proof = keccak256(abi.encodePacked(address(this), _amount));
        require(proof == _hash, "signature should match the amount");
        require(_amount >= address(this).balance, "amount cannot be greater than the balance of the contract");
        receiver.transfer(_amount);
        return true;
    }

    function close() external returns (bool) {
        require(block.timestamp > deadline, "deadline has not been reached yet");
        sender.transfer(address(this).balance);
        open = false;
        emit Closed();
        return true;
    }
}