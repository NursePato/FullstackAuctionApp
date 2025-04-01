

import { useState, useContext } from "react";
import UserLogin from "../UserLogin/UserLogin";
import RegisterUser from "../RegisterUser/RegisterUser";
import UpdateUser from "../UpdateUser/UpdateUser";
import { UsersContext } from "../../contexts/UsersProvider";
import "./LoginPage.css";

const LoginPage = () => {
    const { user } = useContext(UsersContext);
    const [showLogin, setShowLogin] = useState(true); // Toggle between login & register

    return (
        <div className="login-page">
            {!user ? (
                <>
                    <div className="auth-tabs">
                        <button className={showLogin ? "active" : ""} onClick={() => setShowLogin(true)}>Login</button>
                        <button className={!showLogin ? "active" : ""} onClick={() => setShowLogin(false)}>Register</button>
                    </div>
                    {showLogin ? <UserLogin /> : <RegisterUser />}
                </>
            ) : (
                <UpdateUser />
            )}
        </div>
    );
};

export default LoginPage;
