// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;


contract Semester {

    struct course {
        string courseName;
        uint256 cgpa;
    }

    string public sessionName;
    address public studentId;
    course[] public courses;

    
    


}