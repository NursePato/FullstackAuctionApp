import { createContext, useState, useEffect, useContext } from "react";
import { fetchMyBids, PlaceBid, removeBid } from "../services/BidService";
import { AuctionContext } from "./AuctionProvider";
import { UsersContext } from "./UsersProvider";
import { GetAuctionDetails } from "../services/AuctionService";

export const BidsContext = createContext(null);

const BidsProvider = (props) => {
    const { user, userLogout } = useContext(UsersContext);
    const { fetchAuctionDetails, auction } = useContext(AuctionContext);
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUserBids = async () => {
        if (!user) {
            setBids([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await fetchMyBids();
            //console.log("📢⚠️ Latest fetched bids:", result);

            if (!result || result.length === 0) {
                setBids([]);
                setError("⚠️ No bids found.");
            } else {
                const bidsWithDetails = await Promise.all(
                    result.map(async (bid) => {
                        let auctionDetails = auction || {};

                        if (!auctionDetails || auctionDetails.auctionId !== bid.auctionId) {
                            auctionDetails = await GetAuctionDetails(bid.auctionId) || {};
                        }

                        return {
                            ...bid,
                            auctionName: auctionDetails.auctionName || "Auction Not Found",
                            closingTime: auctionDetails.closingTime || "TBD",
                        };
                    })
                );

                setBids(bidsWithDetails);
            }
        } catch (err) {
            console.error("Error fetching bids:", err);
            setError("⚠️ Failed to fetch bids.");
            setBids([]);
        }

        setLoading(false);
    };


    const placeBid = async (auctionId, amount) => {
        //console.log("📢 Placing bid for auction:", auctionId, "with amount:", amount);

        const result = await PlaceBid(auctionId, amount);

        //console.log("✅ API Response:", result);

        if (result.succes) {
            console.log("✅ Bid placed successfully, fetching updated bids...");
            await getUserBids();
        } else {
            console.error("❌ Bid placement failed:", result.message);
        }

        return result;
    };



    const deleteBid = async (bidId) => {
        const result = await removeBid(bidId);

        if (result.success) {
            getUserBids();  // Refresh bids if deletion was successful
        } else {
            console.error("Failed to delete bid:", result.message);
        }
    };


    useEffect(() => {
        if (user) {
            getUserBids(); // Fetch bids when the user logs in
        }
    }, [user]);

    useEffect(() => {
        if (!user) {
            setBids([]);  // Clear bids on logout
        }
    }, [userLogout]);

    return (
        <BidsContext.Provider value={{ bids, loading, error, placeBid, deleteBid }}>
            {props.children}
        </BidsContext.Provider>
    );
};

export default BidsProvider;
