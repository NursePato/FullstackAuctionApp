import { useEffect, useContext } from "react";
import { UsersContext } from "../../contexts/UsersProvider";

import React from "react";
import "./BidList.css";

const BidList = ({ bids, currentTime, deleteBid, navigate }) => {
    const { user } = useContext(UsersContext);
    useEffect(() => {
        if (!user) {
            navigate("/LoginPage");
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }
    return (
        <div className="bidListContainer">
            <h3>Your Bids:</h3>
            {bids.length > 0 ? (
                <ul className="bidList">
                    {bids.map((bid) => (
                        <li key={bid.bidId} className="bidItem">
                            <strong>Auction:</strong> {bid.auctionName} - <strong>Bid:</strong> {bid.bidAmount}
                            <p>⏳ Bid Closing Time: {new Date(bid.closingTime).toLocaleString()}</p>
                            <button onClick={() => navigate(`/SearchAuctionById/${bid.auctionId}`)}>
                                View Auction
                            </button>
                            {new Date(bid.closingTime) > currentTime && (
                                <button onClick={() => deleteBid(bid.bidId)}>Remove Bid</button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>⚠️ No bids found.</p>
            )}
        </div>
    );
};

export default BidList;