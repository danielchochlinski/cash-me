// SPDX-License-Identifier: MID
pragma solidity ^0.8.15;

contract Transactions {
    uint256 transactionCount;

    event Transfer(address from, address receiver, uint amount, string message, uint timestamp);

    struct Transaction {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
    }
    Transaction[] transactions;

    mapping(address => uint256[]) private addressToTransactionIds;

    constructor() {
        transactionCount = 0;
    }

    function sendTransaction(address payable receiver, uint amount, string memory message) public payable {
        require(msg.value >= amount, "Insufficient Ether sent");

        transactionCount++;

        transactions.push(Transaction(msg.sender, receiver, amount, message, block.timestamp));

        addressToTransactionIds[msg.sender].push(transactionCount);

        receiver.transfer(amount); // Transfer the specified amount of Ether to the receiver

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp);
    }

    function myTransactions() public view returns (Transaction[] memory) {
        uint256[] memory transactionIds = addressToTransactionIds[msg.sender];
        uint256 count = transactionIds.length;
        Transaction[] memory result = new Transaction[](count);

        for (uint256 i = 0; i < count; i++) {
            result[i] = transactions[transactionIds[i] - 1];
        }

        return result;
    }
}
