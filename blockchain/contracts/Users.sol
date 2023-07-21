// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Users {
    struct UserProfile {
        string username;
        string avatarHash;
        address userAddress;
    }
    mapping(address => UserProfile) private users;

    function getUserInfo(address _userAddress) public view returns (UserProfile memory) {
        return users[_userAddress];
    }

    function getMyInfo() public view returns (UserProfile memory) {
        return users[msg.sender];
    }

    function setInfo(string memory _username, string memory _avatarHash) public {
        users[msg.sender].username = _username;
        users[msg.sender].avatarHash = _avatarHash;
        users[msg.sender].userAddress = msg.sender;
    }
}
