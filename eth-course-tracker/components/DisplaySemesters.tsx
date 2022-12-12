import { ethers } from "ethers";
import React from "react";
import { useEffect } from "react";
import { semesterContractAddress } from "../config";
import SemesterAbi from "../../backend/build/contracts/SemesterContract.json";

const DisplaySemesters = () => {
  useEffect(() => {
    getSemesters();
  }, []);

  const getSemesters = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const SemesterContract = new ethers.Contract(
          semesterContractAddress,
          SemesterAbi.abi,
          signer
        );

        const allSemesters = await SemesterContract.getSemstersByAUser();
        console.log(allSemesters);
      }
    } catch (error) {
      console.log("No Ethereum");
    }
  };
  return <>
    
  </>;
};

export default DisplaySemesters;
