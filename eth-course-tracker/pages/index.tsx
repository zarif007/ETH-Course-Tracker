import AddSemester from '../components/AddSemester';
import ConnectWallet from '../components/ConnectWallet';
import DisplaySemesters from '../components/DisplaySemesters';

export default function Home() {
  return (
    <div>
      <ConnectWallet />
      <AddSemester />
      <div className='mx-auto max-w-2xl bg-indigo-500'>
        <hr />
      </div>
      <DisplaySemesters />
    </div>
  )
}
