import AddSemester from '../components/AddSemester';
import semesterABI from '../../backend/build/contracts/SemesterContract.json'
import { semesterContractAddress } from './../config';
import ConnectWallet from '../components/ConnectWallet';

export default function Home() {
  return (
    <div>
      <ConnectWallet />
      <AddSemester />
    </div>
  )
}
