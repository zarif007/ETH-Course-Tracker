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

        console.log('Account', accounts);
        setIsUserLoggedIn(true);
        setCurrentAccount(accounts[0])
    } catch(error) {
        console.error(error)
    }
  }
  return (
    <div>
        <button onClick={connectWallet} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-xl font-medium">
          Connect Wallet 🦊
        </button>
    </div>
  )
}

export default ConnectWallet
