import React, { useState, useEffect, useContext } from "react";
import BidInput from "../BidInput/BidInput";
import { BidsContext } from "../../contexts/BidsProvider";
import { UsersContext } from "../../contexts/UsersProvider";
import "./AuctionDetails.css";

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

const AuctionDetails = ({ auction }) => {
    const { placeBid } = useContext(BidsContext);
    const { user } = useContext(UsersContext);
    const [bidMessage, setBidMessage] = useState("");

    const handleBidSubmit = async (bidAmount) => {
        if (!user) {
            setBidMessage("You must be logged in to place a bid.");
            return;
        }

        if (user.userId === auction.userId) {
            setBidMessage("You cannot place a bid on your own auction.");
            return;
        }

        const response = await placeBid(auction.auctionId, bidAmount);
        setBidMessage(response.message);
    };

    const auctionStatus = getAuctionStatus(auction.closingTime);
    const isAuctionOpen = auctionStatus === "🟢 Auction ongoing";
    const isOwner = user?.userId === auction.userId;

    return (
        <div className="container">
            <div className="detailsStyle">
                <h2>{auction.auctionName}</h2>
                <p><strong>Description:</strong> {auction.auctionDescription}</p>
                <p><strong>Starting Price:</strong> {auction.startingPrice}</p>
                {/* <p><strong>Auction Start:</strong> {formatDate(auction.openingTime)}</p> */}
                <p><strong>Closing Time:</strong> {formatDate(auction.closingTime)}</p>
                <p><strong>Status:</strong> {auctionStatus}</p>

                {isAuctionOpen && !isOwner && (
                    <div>
                        <h4>Place a Bid:</h4>
                        <BidInput onSubmitBid={handleBidSubmit} />
                    </div>
                )}
                {bidMessage && <p>{bidMessage}</p>}

                <h4>Bids:</h4>
                {auction.bids && auction.bids.length > 0 ? (
                    <ul>
                        {auction.bids.map((bid, index) => (
                            <li key={index}>
                                <strong>{bid.username}</strong> - {bid.bidAmount} on {formatDate(bid.bidTime)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bids yet.</p>
                )}
            </div>
        </div>
    );
};

export default AuctionDetails;