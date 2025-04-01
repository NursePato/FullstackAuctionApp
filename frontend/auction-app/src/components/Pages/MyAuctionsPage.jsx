

import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../contexts/UsersProvider";
import { AuctionContext } from "../../contexts/AuctionProvider";
import MyAuctionList from "../MyAuctionsList/MyAuctionsList";
import { useNavigate } from "react-router-dom";

const MyAuctionsPage = () => {
    const { createdAuctions } = useContext(AuctionContext);
    const { user } = useContext(UsersContext);
    const navigate = useNavigate();
    const [auctions, setAuctions] = useState(createdAuctions);

    useEffect(() => {
        if (!user) {
            navigate("/LoginPage");
        }
    }, [user, navigate]);

    const refreshAuctions = (deletedAuctionId) => {
        setAuctions(auctions.filter((auction) => auction.auctionId !== deletedAuctionId));
    };

    return (
        <div>
            {auctions.map((auction) => (
                <MyAuctionList
                    key={auction.auctionId}
                    auction={auction}
                    onEdit={() => navigate(`/auction/edit/${auction.auctionId}`)}
                    onDeleteSuccess={refreshAuctions} // Pass refresh function
                />
            ))}
        </div>
    );
};

export default MyAuctionsPage;




