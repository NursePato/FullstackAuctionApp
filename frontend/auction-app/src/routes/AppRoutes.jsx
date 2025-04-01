import { Routes, Route } from "react-router-dom";
import Start from "../components/Pages/Start";
import SearchAuctionsPage from "../components/Pages/SearchAuctionsPage";
import AuctionDetailPage from "../components/Pages/AuctionDetailsPage";
import LoginPage from "../components/Pages/LoginPage";
import CreateAuction from "../components/CreateAuction/CreateAuction";
import MyBidsPage from "../components/Pages/MyBidsPage";
import UpdateAuction from "../components/UpdateAuction/UpdateAuction";
import MyAuctionsPage from "../components/Pages/MyAuctionsPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/SearchAuctions" element={<SearchAuctionsPage />} />
            <Route path="/SearchAuctionById/:auctionId" element={<AuctionDetailPage />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/CreateAuction" element={<CreateAuction />} />
            <Route path="/MyBids" element={<MyBidsPage />} />
            <Route path="/auction/edit/:auctionId" element={<UpdateAuction />} />
            <Route path="/MyAuctions" element={<MyAuctionsPage />} />
        </Routes>
    );
};

export default AppRoutes;
