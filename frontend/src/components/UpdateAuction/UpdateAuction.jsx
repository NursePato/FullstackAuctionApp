import { useState, useContext, useEffect } from "react";
import { AuctionContext } from "../../contexts/AuctionProvider";
import { useNavigate, useParams } from "react-router-dom";
import AuctionUpdateMessage from "../AuctionUpdateMessage/AuctionUpdateMessage";
import './UpdateAuction.css';

const UpdateAuction = () => {
    const { updateAuction, createdAuctions } = useContext(AuctionContext);
    const { auctionId } = useParams();
    const navigate = useNavigate();

    // Find the auction with the auctionId
    const auction = createdAuctions.find((a) => a.auctionId === parseInt(auctionId));

    if (!auction) {
        console.error("Auction not found for ID:", auctionId);
        return <p>⚠️ Auction not found.</p>;
    }

    console.log("Auction Data:", auction);
    console.log("Auction Bids:", auction.bids);

    const [formData, setFormData] = useState({
        auctionID: auctionId || "",
        auctionName: auction?.auctionName || "",
        auctionDescription: auction?.auctionDescription || "",
        startingPrice: auction?.startingPrice || 0,
        closingTime: auction?.closingTime || "",
    });

    const [updateMessage, setUpdateMessage] = useState(null);

    useEffect(() => {
        if (auction) {
            setFormData({
                auctionID: auction.auctionId,
                auctionName: auction.auctionName,
                auctionDescription: auction.auctionDescription,
                startingPrice: auction.startingPrice,
                closingTime: auction.closingTime,
            });
        }
    }, [auction]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value === "" ? null : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedAuction = {
            ...formData,
            startingPrice: formData.startingPrice ? parseFloat(formData.startingPrice) : null,
            auctionDto: formData.auctionDto || {},
        };

        try {
            const response = await updateAuction(updatedAuction);

            if (response && response.success) {
                setUpdateMessage("✅ Auction updated successfully!");
                setTimeout(() => {
                    setUpdateMessage(null); // Clear message after a while
                }, 3000);  // Keep the message for 3 seconds
            } else {
                console.error("Auction update failed:", response ? response.message : "Unknown error");
            }
        } catch (error) {
            console.error("Error updating auction:", error);
        }
    };

    return (
        <div className="updateAuctionContainer">
            <h2>Update Auction</h2>
            {updateMessage && <AuctionUpdateMessage message={updateMessage} />}  {/* Display success message */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="auctionName"
                    value={formData.auctionName}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="auctionDescription"
                    value={formData.auctionDescription}
                    onChange={handleChange}
                    required
                />
                <div className="startingPriceContainer">
                    <input
                        type="number"
                        name="startingPrice"
                        value={formData.startingPrice || ""}
                        onChange={handleChange}
                        required={auction?.bids?.length === 0}  // Only required when no bids
                        disabled={auction?.bids?.length > 0}  // Disable when there are bids
                    />
                    <span className="info-icon" data-tooltip="If the auction has a bid on it, you can't change the starting price.">ℹ️</span>
                </div>
                {/* Only show the warning if there are bids */}
                {/* {auction?.bids?.length > 0 && (
                    <p className="warning-text">⚠️ You cannot change the starting price because this auction has a bid.</p>
                )} */}
                <input
                    type="datetime-local"
                    name="closingTime"
                    value={formData.closingTime}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Update Auction</button>
            </form>
        </div>
    );
};

export default UpdateAuction;



