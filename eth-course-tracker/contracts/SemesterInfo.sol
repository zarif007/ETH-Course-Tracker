// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;


contract SemesterInfo {

    uint256 public _idUser;
    address public ownerOfContract;

    address[] public creators;
    string [] public messages;
    uint256[] public messageId;

    struct Course {
        string courseName;
        uint256 cgpa;
    }

    struct PerSemester {
        string sessionName;
        string year;
        Course[] courses;
    } 

    struct SemesterDetails {
        address account;
        uint256 userId;
        PerSemester semester;
    }

    event SemesterEvent (
        address indexed account,
        uint256 indexed userId,
        string sessionName,
        string year,
        Course[] courses
    );

    mapping (address => SemesterDetails) public semesterDetails;

    constructor() {
        ownerOfContract = msg.sender;
    }

    function inc() internal {
        _idUser++;
    }

    function createSemster(PerSemester calldata _message) external {
        inc();

        uint256 idNumber = _idUser;
        SemesterDetails storage sm = semesterDetails[msg.sender];

        sm.account = msg.sender;
        sm.userId = idNumber;
        sm.semester = _message;

    }
}