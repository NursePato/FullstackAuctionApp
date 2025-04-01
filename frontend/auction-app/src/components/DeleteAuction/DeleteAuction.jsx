

import { useContext } from "react";
import { AuctionContext } from "../../contexts/AuctionProvider";

const DeleteAuction = ({ auctionId, onDeleteSuccess, buttonClass }) => {
    const { deleteAuction } = useContext(AuctionContext);

    const handleDelete = async () => {
        console.log("Deleting auction with id:", auctionId);
        const result = await deleteAuction(auctionId);

        if (result.success) {
            alert("✅ Auction deleted successfully!");
            onDeleteSuccess(auctionId);
        } else {
            alert(`❌ ${result.error || "Auction deletion failed. Cannot delete auction when bids are made"}`);
            console.error(`Error deleting auction: ${result.error}`);
        }
    };

    return (
        <button className={buttonClass} onClick={handleDelete}>
            Delete
        </button>
    );
};

export default DeleteAuction;



