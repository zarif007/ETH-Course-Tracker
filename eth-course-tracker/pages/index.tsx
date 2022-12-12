import AddSemester from '../components/AddSemester';
import ConnectWallet from '../components/ConnectWallet';
import DisplaySemesters from '../components/DisplaySemesters';

export default function Home() {
  return (
    <div>
      <ConnectWallet />
      <AddSemester />
      <DisplaySemesters />
    </div>
  )
}
