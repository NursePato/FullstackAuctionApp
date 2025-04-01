

import { useRef, useContext } from "react";
import { UsersContext } from "../../contexts/UsersProvider";
import { AuctionContext } from "../../contexts/AuctionProvider";
import { useNavigate } from "react-router-dom";
import './UserLogin.css';

const UserLogin = () => {
    const textName = useRef();
    const textPwd = useRef();
    const { userLogin } = useContext(UsersContext);
    const { loginUser } = useContext(AuctionContext);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const username = textName.current.value;
        const password = textPwd.current.value;

        if (!username || !password) {
            alert("❌ Please fill in both fields.");
            return null;
        }
        const loginSuccess = await userLogin(username, password);
        if (!loginSuccess) {
            alert("❌ Invalid username or password.");
            return null;
        }
        loginUser(username); // Save user in AuctionContext
        navigate("/");
    };

    return (
        <div className="user-login">
            <input ref={textName} placeholder="Username" className="input" type="text" />
            <input ref={textPwd} placeholder="Password" className="input" type="password" id="password" />
            <button id="button" onClick={handleLogin}>Log in</button>
        </div>
    );
};

export default UserLogin;

