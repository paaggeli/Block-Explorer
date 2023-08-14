import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Block Explorer</Link></li>
                <li><Link to="/account-balance">Account Balance</Link></li>
                <li><Link to="/nft">NFT</Link></li>
                <li><Link to="pending-transactions">Pending Transactions</Link></li>
            </ul>
        </nav>
    );
}

export default Navigation;