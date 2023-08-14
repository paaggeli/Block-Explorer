import { Utils } from 'alchemy-sdk';

function TransactionDetails({transaction}) {
    if (!transaction) {
        return (<div>Loading Transaction Details...</div>);
    }

    return (
        <div>
            <h2>Transacrion: {transaction.hash}</h2>
            <ul className="unstyle">
                <li>From: {transaction.from}</li>
                <li>To: {transaction.to}</li>
                <li>Value: {Utils.formatEther(transaction.value)} Ether</li>
                <li>Nonce: {transaction.nonce}</li>
                <li>Type: {transaction.type}</li>
            </ul>
        </div>
    )
}

export default TransactionDetails;