import { Utils } from 'alchemy-sdk';

function BlockDetails( {blockDetails} ) {
    if (!blockDetails) {
        return <div>Loading block details...</div>;
    }
    return (
        <div>
            <h3>Block Details (Block #{blockDetails.number})</h3>
            <ul className="unstyle">
                <li>Base Fee Per Gas: {Utils.formatUnits(parseInt(blockDetails.baseFeePerGas._hex), 'gwei')} Gwei</li>
                <li>Gas Limit: {parseInt(blockDetails.gasLimit._hex)}</li>
                <li>Gas Used: {parseInt(blockDetails.gasUsed._hex)}</li>
                <li>Hash: {blockDetails.hash}</li>
                <li>Miner: {blockDetails.miner}</li>
                <li>Parent Hash: {blockDetails.parentHash}</li>
                <li>Timestamp: {blockDetails.timestamp}</li>
            </ul>
        </div>
    );
}

export default BlockDetails;