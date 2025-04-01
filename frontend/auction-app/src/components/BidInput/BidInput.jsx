

import { useState } from "react";
import './BidInput.css';

const BidInput = ({ onSubmitBid }) => {
    const [bidAmount, setBidAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= 0) {
            alert("Please enter a valid bid amount.");
            return;
        }
        onSubmitBid(Number(bidAmount));
    };

    return (
        <form className="bidInputForm" onSubmit={handleSubmit}>
            <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter bid amount"
                required
            />
            <button type="submit">Place Bid</button>
        </form>
    );
};

export default BidInput;
