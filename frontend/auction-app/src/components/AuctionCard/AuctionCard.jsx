
import './AuctionCard.css';

const getAuctionStatus = (closingTime) => {
    const now = new Date();
    const endDate = new Date(closingTime);
    return now < endDate ? "🟢 Auction ongoing" : "🔴 Auction closed";
};

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleString();
};

const AuctionCard = ({ auction }) => {
    const auctionStatus = getAuctionStatus(auction.closingTime);

    return (
        <div className='container'>
            <div className="cardStyle">
                <h3>{auction.auctionName}</h3>
                <h4>{auction.auctionDescription}</h4>
                <p>Starting Price: {auction.startingPrice}</p>
                <p>Auction Start: {formatDate(auction.openingTime)}</p>
                <p>Auction End: {formatDate(auction.closingTime)}</p>
                <p>Auction ID: {auction.auctionId}</p>
                <p>{auctionStatus}</p>
            </div>
        </div>
    );
};

export default AuctionCard;
