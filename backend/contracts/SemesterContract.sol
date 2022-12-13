// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract SemesterContract {
  
  event AddSemester(address recipient, uint id);

  struct SemesterDetails {
      uint id; 
      string studentId;
      string sessionName;
      string year;
      string[] courseNames;
      string[] cgpas;
  }

  SemesterDetails[] semestersDetails;

  mapping(uint256 => address) semesterToStudent;


  function addSemester(string memory studentId, string memory sessionName, string memory year, string[] memory courseNames, string[] memory cgpas) external {

    uint id = semestersDetails.length;

    semestersDetails.push(SemesterDetails(id, studentId, sessionName, year, courseNames, cgpas));

    semesterToStudent[id] = msg.sender;

    emit AddSemester(msg.sender, id);
  }

  function getSemstersByAUser() external view returns (SemesterDetails [] memory) {

    SemesterDetails[] memory temp = new SemesterDetails[](semestersDetails.length);

    for(uint i=0; i<semestersDetails.length; i++) {
      temp[i] = semestersDetails[i];
    }

    return temp;
  }

}
 