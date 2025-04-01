import { useContext } from "react";
import { BidsContext } from "../../contexts/BidsProvider";
import { useNavigate } from "react-router-dom";
import BidList from "../../components/BidList/BidList";

const MyBidsPage = () => {
    const { bids, loading, error, deleteBid } = useContext(BidsContext);
    const navigate = useNavigate();
    const currentTime = new Date();

    if (loading) return <p>Loading your bids...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="view">
            <BidList
                bids={bids}
                currentTime={currentTime}
                deleteBid={deleteBid}
                navigate={navigate}
            />
        </div>
    );
};

export default MyBidsPage;

