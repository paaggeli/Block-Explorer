import { useState, useRef } from 'react';

function AccountBalance({alchemy}) {
    const inputRef = useRef();
    const [balance, setBalance] = useState(null);

    const handleCheckBalance = async () => {
        const address = inputRef.current.value;
        setBalance( await alchemy.core.getBalance(address));
    }

    return (
        <div>
            <h1>Account Balance</h1>
            <input type="text" ref={inputRef} placeholder="Enter Ethereum address" />
            <button onClick={handleCheckBalance}>Check Balance</button>
            { balance && 
                <p>The Balance is {parseInt(balance._hex)} Wei</p>
            }
        </div>
    );
}

export default AccountBalance;