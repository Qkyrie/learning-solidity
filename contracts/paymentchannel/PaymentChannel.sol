pragma solidity ^0.4.24;

 /*
  * Reference implementation of a payment channel.
  * @author Quinten De Swaef
  */
contract PaymentChannel {

    constructor() {

    }

    function submitProof() external returns (bool) {
        return true;
    }


    function close() external returns (bool) {
        return true;
    }
}