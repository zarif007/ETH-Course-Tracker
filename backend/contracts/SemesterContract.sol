// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract SemesterContract {
  
  event AddSemester(address recipient, uint id);

  struct Course {
      string courseName;
      uint256 cgpa;
  }

  struct SemesterDetails {
      uint id; 
      string sessionName;
      string year;
      Course[] courses;
  }

  SemesterDetails[] private semestersDetails;

  mapping(uint256 => address) semesterToStudent;

  function addSemester(string memory sessionName, string memory year, Course[] memory course) external {

    uint id = semestersDetails.length;
    
    semestersDetails.push(SemesterDetails(id, sessionName, year, course));

    semesterToStudent[id] = msg.sender;

    emit AddSemester(msg.sender, id);
  }

  function getSemstersByAUser() external view returns (SemesterDetails [] memory) {

    SemesterDetails[] memory temp = new SemesterDetails[](semestersDetails.length);

    uint counter = 0;

    for(uint i=0; i<semestersDetails.length; i++) {
      if(semesterToStudent[i] == msg.sender){
        temp[counter++] = semestersDetails[i];
      }
    }

    SemesterDetails[] memory result = new SemesterDetails[](counter);

    for(uint i=0; i<counter; i++) {
      result[i] = temp[i];
    }

    return result;
  }

}
 