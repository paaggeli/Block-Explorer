import { useState, useRef } from 'react';
import { Utils } from 'alchemy-sdk';
import TransactionsReceivedThisYear from './TransactionsReceivedThisYear.js';

function AccountBalance({alchemy}) {
    const inputRef = useRef();
    const [balance, setBalance] = useState(null);
    const [address, setAddress] = useState(null);

    const handleCheckBalance = async () => {
        const address = inputRef.current.value;
        setAddress(address);
        setBalance( await alchemy.core.getBalance(address));
    }

    return (
        <div>
            <h1>Account Balance</h1>
            <input type="text" ref={inputRef} placeholder="Enter Ethereum address" />
            <button onClick={handleCheckBalance}>Check Balance</button>
            { balance && 
                <p>The Balance is {Utils.formatEther(balance)} Ether</p>
            }
            <TransactionsReceivedThisYear alchemy={alchemy} address={address} />
        </div>
    );
}

export default AccountBalance;