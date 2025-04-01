import { NavLink } from "react-router-dom";
import "./Start.css";

const Start = () => {
    return (
        <div className="startView">
            <h1>Welcome to my Auction Application</h1>
            <p>Your new go-to platform for buying and selling items through online auctions.</p>

            <div className="features">
                <h3>Features:</h3>
                <ul>
                    <li>Browse and search auctions by name or category</li>
                    <li>Create and manage your own auctions</li>
                    <li>Place bids on active auctions</li>
                    <li>Track your bids and auction results</li>
                </ul>
            </div>

            <div className="cta">
                <h3>Get Started:</h3>
                <button>
                    <NavLink to="/SearchAuctions">Browse Auctions</NavLink>
                </button>
                <button>
                    <NavLink to="/CreateAuction">Create An Auction</NavLink>
                </button>

                <p>Already have an account? <NavLink to="/LoginPage">Login here</NavLink></p>
                <p>New to auctions? <NavLink to="/LoginPage">Sign up</NavLink> and get started!</p>
            </div>
        </div>
    );
};

export default Start;
