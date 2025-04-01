import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuctionContext } from "../../contexts/AuctionProvider";
import { BidsContext } from "../../contexts/BidsProvider";
import AuctionDetails from "../AuctionDetails/AuctionDetails";
import BidInput from "../BidInput/BidInput";
import BidMessage from "../BidMessage/BidMessage";

const AuctionDetailPage = () => {
    const { auctionId } = useParams();
    const { auction, loading, error, fetchAuctionDetails } = useContext(AuctionContext);
    const { placeBid } = useContext(BidsContext);
    const [bidMessage, setBidMessage] = useState("");
    const userId = localStorage.getItem("userId"); // Get logged-in user ID

    useEffect(() => {
        fetchAuctionDetails(auctionId);
    }, [auctionId]);

    const handleBidSubmit = async (bidAmount) => {
        const bidResult = await placeBid(auctionId, bidAmount);

        if (bidResult.success) {
            setBidMessage("✅ Bid placed successfully!");
            fetchAuctionDetails(auctionId); // Refresh auction data
        } else {
            setBidMessage(`❌ Failed to place bid: ${bidResult.message}`);
        }
    };

    if (loading) return <p>Loading auction details...</p>;
    if (error) return <p>{error}</p>;
    if (!auction) return <p>No auction found.</p>;

    const isAuctionOpen = new Date(auction.closingTime) > new Date();
    const isAuctionOwner = auction.userId == userId; // Assuming auction object has ownerId

    return (
        <div className="auction-detail">
            <AuctionDetails auction={auction} />

            {isAuctionOpen && !isAuctionOwner && (
                <div>
                    <h4>Place a Bid:</h4>
                    <BidInput onSubmitBid={handleBidSubmit} />
                    <BidMessage message={bidMessage} />
                </div>
            )}
        </div>
    );
};

export default AuctionDetailPage;


