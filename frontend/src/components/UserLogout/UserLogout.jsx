import { useContext } from "react";
import { UsersContext } from "../../contexts/UsersProvider";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
    const { user, userLogout } = useContext(UsersContext);
    const navigate = useNavigate();

    if (!user) return null;

    const handleLogout = () => {
        userLogout();
        navigate("/");
    };

    return <button onClick={handleLogout} className="logoutButton">Log out</button>;
};

export default UserLogout;
