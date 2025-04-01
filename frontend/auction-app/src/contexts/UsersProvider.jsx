

import { useState, createContext } from "react";
import { Login, RegisterUser, UpdateUser } from "../services/UsersService";
import { jwtDecode } from "jwt-decode";

export const UsersContext = createContext();

const UsersProvider = (props) => {
    const [user, setUser] = useState(null);

    const userLogin = async (username, password) => {
        const token = await Login(username, password); // `token` is now just the string
        if (token) {
            localStorage.setItem("token", token);

            try {
                const decoded = jwtDecode(token); // Decode token

                console.log("✅ Decoded Token:", decoded);

                if (!decoded.UserID || !decoded.Username) {
                    throw new Error("Missing UserID or Username in token");
                }

                setUser({
                    userId: decoded.UserID,
                    username: decoded.Username,
                    token
                });

                console.log("✅ User logged in:", decoded.UserID, decoded.Username);
                return true;
            } catch (error) {
                console.error("❌ Error decoding token:", error);
                return false;
            }
        } else {
            console.error("❌ No token received from server.");
            return false;
        }
    };

    const registerUser = async (username, password) => {
        const success = await RegisterUser(username, password);
        return success;
    };
    const updateUser = async (userId, username, password) => {
        const result = await UpdateUser(userId, username, password);
        console.log("Sending to API:", { userId, username, password });
        if (result) {
            setUser({ ...user, username }); // Update user state
        }
    };
    const userLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <UsersContext.Provider value={{ user, userLogin, userLogout, registerUser, updateUser }}>
            {props.children}
        </UsersContext.Provider>
    );
};

export default UsersProvider;


