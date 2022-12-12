import { ethers } from 'ethers'
import React, { useState } from 'react'

const ConnectWallet = () => {
  
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [currentAccount, setCurrentAccount] = useState<string>('');

  const connectWallet = async () => {
    try {
        const { ethereum } = window;
        if(!ethereum) {
            console.log('Metamask not detected')
            return;
        }
        let chainId = await ethereum.request({method: 'eth_chainId'})

        let accounts = await ethereum.request({method: 'eth_requestAccounts'})

        setIsUserLoggedIn(true);
        setCurrentAccount(accounts[0])
    } catch(error) {
        console.error(error)
    }
  }
  return (
    <div className='flex justify-center mt-12'>
        <div className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-xl font-medium">
          {
            isUserLoggedIn ? <div>{currentAccount}</div> : 
            <button onClick={connectWallet}>Connect Wallet 🦊</button>
          }
        </div>
    </div>
  )
}

export default ConnectWallet
