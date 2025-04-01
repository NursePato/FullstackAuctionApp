

import styles from "./MyAuctionsList.module.css";
import DeleteAuction from "../DeleteAuction/DeleteAuction";

const MyAuctionList = ({ auction, onEdit, onDeleteSuccess }) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{auction.auctionName}</h3>
            <p className={styles.description}>{auction.auctionDescription}</p>
            <p className={styles.time}>
                Closing Time: {new Date(auction.closingTime).toLocaleString()}
            </p>
            <div className={styles.actions}>
                <button className={styles.editButton} onClick={() => onEdit(auction.auctionId)}>
                    Edit
                </button>
                <DeleteAuction auctionId={auction.auctionId} onDeleteSuccess={onDeleteSuccess} buttonClass={styles.deleteButton} />
            </div>
        </div>
    );
};

export default MyAuctionList;


