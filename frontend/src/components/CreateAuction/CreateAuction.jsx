

import { useState, useContext, useEffect } from "react";
import { AuctionContext } from "../../contexts/AuctionProvider";
import { UsersContext } from "../../contexts/UsersProvider";
import { useNavigate } from "react-router-dom";
import './CreateAuction.css';

const CreateAuction = () => {
    const { createAuction } = useContext(AuctionContext);
    const { user } = useContext(UsersContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        auctionName: "",
        auctionDescription: "",
        startingPrice: "",
        closingTime: ""
    });

    useEffect(() => {
        if (!user) {
            navigate("/LoginPage");
        }
    }, [user, navigate]);

    // Prevent rendering form while checking user state
    if (!user) {
        return null;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const auctionData = {
            AuctionName: formData.auctionName,
            AuctionDescription: formData.auctionDescription,
            StartingPrice: parseFloat(formData.startingPrice), // Convert to number
            OpeningTime: new Date().toISOString(), // Set to current time
            ClosingTime: new Date(formData.closingTime).toISOString()
        };

        console.log("🟡 Sending Auction Data:", auctionData);

        const result = await createAuction(auctionData);
        if (result) {
            console.log("✅ Auction created successfully:", result);
            navigate("/MyAuctions");
        }
    };

    return (
        <div className="createAuctionContainer">
            <h2>Create Auction</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="auctionName" placeholder="Auction Name" onChange={handleChange} required />
                <textarea name="auctionDescription" placeholder="Auction Description" onChange={handleChange} required />
                <input type="number" name="startingPrice" placeholder="Starting Price" onChange={handleChange} required />
                <input type="datetime-local" name="closingTime" onChange={handleChange} required />
                <button type="submit">Create Auction</button>
            </form>
        </div>
    );
};

export default CreateAuction;

