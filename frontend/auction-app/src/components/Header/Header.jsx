

import { useContext } from "react";
import { UsersContext } from "../../contexts/UsersProvider";
import "./Header.css";

const Header = () => {
    const { user } = useContext(UsersContext);

    return (
        <div className="header">
            <h1>Minimal Auction App</h1>
            {user && <span>Welcome, {user.username}!</span>}
        </div>
    );
};

export default Header;

