

export const GetAuctionDetails = async (auctionId) => {
    if (!auctionId) {
        console.error("Error: auctionId is missing.");
        return null;
    }

    const url = `http://localhost:5120/api/SearchAuctionById/${auctionId}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.error("❌ Error fetching auction details:", error);
        return null;
    }
};

export const CreateAuction = async (auctionData) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("❌ No token found, user must be logged in.");
        return null;
    }
    console.log("🟡 Sending Auction Data:", auctionData);
    try {
        const response = await fetch("http://localhost:5120/api/CreateAuction/Create-Auction", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(auctionData)
        });

        if (!response.ok) {
            throw new Error("❌ Auction creation failed: " + response.statusText);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Error creating auction:", error);
        return null;
    }
};
export const UpdateAuction = async (auctionData) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("❌ No token found. User must be logged in.");
        return null;
    }

    const { auctionID, auctionName, auctionDescription, startingPrice, closingTime, bids } = auctionData;

    const requestBody = bids && bids.length > 0
        ? { auctionID, auctionName, auctionDescription, closingTime }
        : { auctionID, auctionName, auctionDescription, startingPrice, closingTime };

    try {
        const response = await fetch("http://localhost:5120/api/Auction/UpdateAuction", {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error("❌ Auction update failed: " + errorText);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Error updating auction:", error);
        return null;
    }
};


export const DeleteAuction = async (auctionId) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("❌ No token found. User must be logged in.");
        return { success: false, message: "No token." };
    }

    if (!auctionId) {
        console.error("❌ Invalid auctionId:", auctionId);
        return { success: false, message: "Invalid auction ID." };
    }

    try {
        const response = await fetch(`http://localhost:5120/api/Auction/${auctionId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error("❌ Auction deletion failed: " + errorText);
        }

        return { success: true, message: "Auction deleted successfully." };
    } catch (error) {
        console.error("❌ Error deleting auction:", error);
        return { success: false, message: error.message };
    }
};

