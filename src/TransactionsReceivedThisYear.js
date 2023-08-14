import { useState, useEffect } from 'react';
import EthDater from 'ethereum-block-by-date';

function TransactionsReceivedThisYear({alchemy, address}) {
    const [receivedTransactions, setReceivedTransactions] = useState([]);
    const [visibleTransactions, setVisibleTransactions] = useState(20);
    const dater = new EthDater(alchemy.core);
    
    useEffect(() => {
        if (address) {
        setReceivedTransactions([]);
        async function getBlockNumberByTime() {
            const timestamp = new Date().getUTCFullYear()+'-01-01T00:00:00Z';
            
            const firstBlockOfYear = await dater.getDate(timestamp);
            const transactions = await alchemy.core.getAssetTransfers({
                fromBlock: "0x"+firstBlockOfYear.block.toString(16),
                toAddress: address,
                category: ["external", "internal", "erc20", "erc721", "erc1155", "specialnft"],
            });
            
            if ( transactions.transfers.length === 0 ) {
                setReceivedTransactions(false);
            } else {
                setReceivedTransactions(transactions.transfers);
                setVisibleTransactions(20);
            }
        }
        getBlockNumberByTime();
    }
    }, [address]);

    const handleLoadMore = () => {
        setVisibleTransactions(prevVisible => prevVisible+20);
    }

    return (
        <div>
            { receivedTransactions.length === 0 && address ? (
                <p>Loading transactions...</p>
            ): receivedTransactions === false ? (
                <p>No transactions to display for the address</p>
            ):(
                <ul>
                    { receivedTransactions.slice(0, visibleTransactions).map((transfer) => (
                        <li key={transfer.hash}>{transfer.hash}</li>
                    ))}
                </ul>
            )}    
            {visibleTransactions < receivedTransactions.length && (
                <button onClick={handleLoadMore}>Load More</button>
            )}
        </div>
    );
}

export default TransactionsReceivedThisYear;