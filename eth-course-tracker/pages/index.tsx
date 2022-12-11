import AddSemester from '../components/AddSemester';
import semesterABI from '../../backend/build/contracts/SemesterContract.json'
import { semesterContractAddress } from './../config';

export default function Home() {
  return (
    <div>
      <AddSemester />
    </div>
  )
}
