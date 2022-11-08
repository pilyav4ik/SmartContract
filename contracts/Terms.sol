// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Terms{

    address owner;

    constructor(){
        owner = msg.sender;
    }

    function pay() external payable{

    }

    function withdraw(address payable _to) external{
        //require
        require(msg.sender == owner, "you are not an owner");
        _to.transfer(address(this).balance);
    }

    function withdrawRevert(address payable _to) external{
        if(msg.sender == owner){
            revert("you are not an owner");
        }

        _to.transfer(address(this).balance);
    }
}