

const GetAuctions = async (keyword) => {
    // if (!keyword.trim()) {
    //     console.error("Search keyword cannot be empty");
    //     return [];
    // }
    if (keyword === null || keyword.trim() === "") {
        // Pass an empty string or null to the backend
        keyword = null;
    }

    const url = `http://localhost:5120/api/Search-Auctions?keyword=${encodeURIComponent(keyword)}`;


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const result = await response.json();
        console.log("Fetched data:", result);
        return result;
    } catch (error) {
        console.error("Error fetching auctions:", error);
        return [];
    }
};

export default GetAuctions;
