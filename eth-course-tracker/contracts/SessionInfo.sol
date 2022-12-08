// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;


contract Semester {

    uint public ownerOfContract;

    address[] public students;

    struct course {
        string courseName;
        uint256 cgpa;
    }

    struct SemesterDetails {
        address account;
        string semesterName;
        string year;
        course[] courses;
    }

    event SemesterEvent (
        address indexed account,
        string semesterName,
        string year,
        course[] courses
    );

    mapping (address => SemesterDetails) public semesterDetails;

    constructor() {
        ownerOfContract = msg.sender;
    }

    
}