import {useState, useEffect } from "react";
import BlockDetails from './BlockDetails';
import TransactionList from './TransactionList';

function BlockList({alchemy}) {
    const [blockNumbers, setBlockNumbers] = useState([]);
    const [selectedBlock, setSelectedBlock] = useState(null);
    const [blockDetails, setBlockDetails] = useState(null);

    // Get the last 5 blocks
    useEffect(() => {
        async function getLastBlockNumber() {
            const lastBlockNumber = await alchemy.core.getBlockNumber();
            return lastBlockNumber;
        }

        async function fetchBlockNumbers() {
            const lastBlockNumber = await getLastBlockNumber();
            const blockNumberArray = Array.from({length:5}, (item, index) => lastBlockNumber - index );
            setBlockNumbers(blockNumberArray);
        }
        fetchBlockNumbers();
    }, [alchemy]);

    // Get the selected block's details
    useEffect(() => {
        async function getBlockDetails() {
            setBlockDetails(await alchemy.core.getBlockWithTransactions(selectedBlock));
        }
        getBlockDetails();
    }, [selectedBlock, alchemy]);

    const handleBlockClick = (blockNumber) => {
        setSelectedBlock(blockNumber);
    };

    return (
        <div>
            <h1>Ethereum Blockchain Explorer</h1>
            <h2 className="test">Last 5 Block Numbers</h2>
            <ul>
                {blockNumbers.map((blockNumber) => (
                    <li key={blockNumber} className="select" onClick={() => handleBlockClick(blockNumber)}>
                        {blockNumber}
                    </li>
                ))}
            </ul>
            {selectedBlock && (
                <div>
                    <BlockDetails blockDetails={blockDetails} />
                    <TransactionList transactions={blockDetails.transactions} blockNumber={selectedBlock} />
                </div>
            )}
        </div>
    );
}

export default BlockList;