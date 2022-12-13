import React from 'react'
import { connectWallet, useGetWalletAddress } from '../hooks/connectWallet';

const ConnectWallet = () => {
  
  const { isLoading, isError, data: address } = useGetWalletAddress();

  return (
    <div className='flex justify-center mt-12'>
        <div className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-xl font-medium">
          {
            address ? <div>{address}</div> : 
            <button onClick={connectWallet}>Connect Wallet 🦊</button>
          }
        </div>
    </div>
  )
}

export default ConnectWallet
