import UserLogout from "../UserLogout/UserLogout";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../contexts/UsersProvider";
import "./Navbar.css";

const Navbar = () => {
    const { user, userLogout } = useContext(UsersContext);

    return (
        <div className="navbar">
            <ul>
                <li><NavLink to="/" exact>Start</NavLink></li>
                <li><NavLink to="/SearchAuctions">Search Auctions</NavLink></li>
                <li><NavLink to="/CreateAuction">Create Auction</NavLink></li>
                <li><NavLink to="/MyBids">My Bids</NavLink></li>
                <li><NavLink to="/MyAuctions">My Auctions</NavLink></li>
                {user ? (
                    <>
                        <li><UserLogout /></li>
                    </>
                ) : (
                    <li><NavLink to="/LoginPage">Login</NavLink></li>
                )}
            </ul>
        </div>
    );
};

export default Navbar;
