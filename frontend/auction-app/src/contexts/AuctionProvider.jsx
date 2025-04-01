

import { createContext, useState, useEffect } from "react";
import { GetAuctionDetails, CreateAuction, DeleteAuction, UpdateAuction } from "../services/AuctionService";

export const AuctionContext = createContext();

const AuctionProvider = (props) => {
    const [auction, setAuction] = useState(null); // Store auction details
    const [loading, setLoading] = useState(false); // Track loading state
    const [error, setError] = useState(null); // Track errors
    const [createdAuctions, setCreatedAuctions] = useState([]); // Track user-created auctions
    const [currentUser, setCurrentUser] = useState(null); // Store logged-in user
    const fetchAuctionDetails = async (auctionId) => {
        console.log("Fetching auction details...");
        setLoading(true);
        try {
            const result = await GetAuctionDetails(auctionId);

            if (result && Array.isArray(result) && result.length > 0) {
                const auctionDetails = {
                    message: result[0].message,
                    auctionId: result[0].auctionId,
                    auctionName: result[0].auctionName,
                    auctionDescription: result[0].auctionDescription,
                    startingPrice: result[0].startingPrice,
                    closingTime: result[0].closingTime,
                    bids: result.map((item) => ({
                        bidId: item.bidId,
                        bidAmount: item.bidAmount,
                        bidTime: item.bidTime,
                        userId: item.userId,
                        username: item.username
                    })),
                };

                setAuction(auctionDetails);
            } else {
                setError("⚠️ No auction found.");
            }
        } catch (err) {
            setError("⚠️ Failed to fetch auction details.");
        }
        setLoading(false);
    };

    // Load auctions when user logs in
    useEffect(() => {
        if (currentUser) {
            const storedAuctions = JSON.parse(localStorage.getItem(`auctions_${currentUser}`)) || [];
            setCreatedAuctions(storedAuctions);
        } else {
            setCreatedAuctions([]); // Clear if no user
        }
    }, [currentUser]);

    // Save auctions when they change
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(`auctions_${currentUser}`, JSON.stringify(createdAuctions));
        }
    }, [createdAuctions, currentUser]);


    const createAuction = async (auctionData) => {
        const result = await CreateAuction(auctionData);
        if (result && result.auctionId) {
            console.log("✅ Auction created successfully:", result);

            // Create a new auction object with all necessary fields
            const newAuction = {
                auctionId: result.auctionId,
                auctionName: auctionData.AuctionName,
                auctionDescription: auctionData.AuctionDescription,
                startingPrice: auctionData.StartingPrice,
                closingTime: auctionData.ClosingTime
            };

            setCreatedAuctions((prev) => {
                const updatedAuctions = [...prev, newAuction];
                localStorage.setItem(`auctions_${currentUser}`, JSON.stringify(updatedAuctions)); // Save to local storage
                return updatedAuctions;
            });

            console.log("Created Auctions after adding new auction:", newAuction);
        }
        return result;
    };




    const updateAuction = async (auctionData) => {
        const result = await UpdateAuction(auctionData);
        if (result) {
            console.log("✅ Auction updated successfully:", result);
            setCreatedAuctions((prev) =>
                prev.map((auction) =>
                    auction.auctionId === auctionData.auctionID ? { ...auction, ...auctionData } : auction
                )
            );
        }
        return result;
    };

    const deleteAuction = async (auctionId) => {
        const result = await DeleteAuction(auctionId);
        if (result.success) {
            console.log("✅ Auction deleted successfully:", result);
            setCreatedAuctions((prev) => prev.filter((auction) => auction.auctionId !== auctionId));
        }
        return result;
    };

    const loginUser = (username) => {
        setCurrentUser(username);
    };

    const logoutUser = () => {
        setCurrentUser(null);
    };
    return (
        <AuctionContext.Provider value={{ auction, loading, error, createdAuctions, fetchAuctionDetails, createAuction, deleteAuction, updateAuction, loginUser, logoutUser }}>
            {props.children}
        </AuctionContext.Provider>
    );
};


export default AuctionProvider;