
import { Link } from "react-router-dom";
import AuctionCard from "../AuctionCard/AuctionCard";

const AuctionCardList = ({ auctions }) => {
    return (
        <>
            {auctions.map((auction) => (
                <Link key={auction.auctionId} to={`/SearchAuctionById/${auction.auctionId}`}>
                    <AuctionCard auction={auction} />
                </Link>
            ))}
        </>
    );
};

export default AuctionCardList;

