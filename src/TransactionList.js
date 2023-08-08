import { useState } from 'react';
import TransactionDetails from './TransactionDetails';

function TransactionList({transactions, blockNumber}) {
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleTransactionClick = (transaction) => {
       setSelectedTransaction(transaction);
    }

    if ( transactions.length === 0 ) {
        return <div>No transactions found for this block.</div>;
    }
    
    return (
        <div>
            <div>
                <h3>Transactions List (Block #{blockNumber})</h3>
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction.hash} className="select" onClick={() => {handleTransactionClick(transaction)}}>{transaction.hash}</li>
                    ))}
                </ul>
            </div>
            {selectedTransaction && 
                ( <TransactionDetails transaction={selectedTransaction} /> )
            }
        </div>
    );
}

export default TransactionList;