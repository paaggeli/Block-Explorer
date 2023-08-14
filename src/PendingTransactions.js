import { useState, useRef } from 'react';

function PendingTransactions({alchemy}) {
    const [ message, setMessage ] = useState(null);
    const inputAddressRef = useRef();
    
    const handleCheckAddress = async () => {
        const inputAddress = inputAddressRef.current.value;
        const response = await alchemy.transact.getTransaction(inputAddress);
        isNaN(response.blockNumber) ? setMessage('Transaction is still pending') : setMessage('Transaction is mined. Block number: '+ response.blockNumber);
    }

    return (
        <div>
            <p>check if transaction got mined</p>
            <input type="text" ref={inputAddressRef} laceholder="Enter the transaction's hash" />
            <button onClick={handleCheckAddress} >Check address</button>
            { message && (
                <p>{message}</p>
            )}
        </div>
    );
}

export default PendingTransactions;