import { ethers } from "ethers";
import { useQuery } from "react-query";
import { semesterContractAddress } from "../config";
import SemesterAbi from "../../backend/build/contracts/SemesterContract.json";
import { useGetWalletAddress } from "./connectWallet";


const formatSemesters = (semesters: any) => {
    const formatted: any = [];
  
    semesters.map((semester: any) => {
      const semObj: any = {};
      
      semObj.studentId = semester[1];
      semObj.sessionName = semester[2];
      semObj.year = semester[3];
      semObj.courses = [];
  
      for(let i=0; i<semester[4].length; i++) {
        const crObj = {
          courseName: semester[4][i],
          cgpa: semester[5][i],
        }
  
        semObj.courses.push(crObj);
      }
  
      formatted.push(semObj);
    })
  
    return formatted;
  }

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
        console.log(formatSemesters(allSemesters))
        return formatSemesters(allSemesters);
      }
    } catch (error) {
      console.log("No Ethereum");
    }
  };


export const useGetSemesters = () =>
  useQuery(["get-semesters"], getSemesters);
