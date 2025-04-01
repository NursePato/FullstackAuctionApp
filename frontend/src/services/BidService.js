export const PlaceBid = async (auctionID, amount) => {
    const token = localStorage.getItem("token"); // Get stored JWT
    console.log("Stored token:", token);
    if (!token) {
        console.error("❌ No auth token found. User must log in.");
        return { success: false, message: "You must be logged in to place a bid." };
    }

    const url = `http://localhost:5120/api/MakeBid?auctionID=${auctionID}&amount=${amount}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`, // Include JWT
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to place bid.");

        console.log("✅ Bid placed successfully:", result);
        return result;
    } catch (error) {
        console.error("❌ Error placing bid:", error);
        return { success: false, message: error.message };
    }
};

export const fetchMyBids = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("You must be logged in to view your bids.");
    }

    try {
        const response = await fetch("http://localhost:5120/api/Bids/GetMyBids", {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch bids.");

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};


export const removeBid = async (bidId) => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("You must be logged in.");
        return { success: false, message: "User is not logged in." };
    }

    try {
        const response = await fetch(`http://localhost:5120/api/RemoveBid?bidID=${bidId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to remove bid.");

        alert("Bid removed successfully.");
        return { success: true };
    } catch (error) {
        alert(error.message);
        return { success: false, message: error.message };
    }
};