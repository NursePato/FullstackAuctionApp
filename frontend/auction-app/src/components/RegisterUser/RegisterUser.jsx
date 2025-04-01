import { useRef, useContext } from "react";
import { UsersContext } from "../../contexts/UsersProvider";
import "./RegisterUser.css";

const RegisterUser = () => {
    const textName = useRef();
    const textPwd = useRef();
    const { registerUser } = useContext(UsersContext);

    const handleRegister = async (event) => {
        event.preventDefault();
        const success = await registerUser(textName.current.value, textPwd.current.value);
        if (success) {
            alert("✅ User registered successfully! You can now log in.");
        } else {
            alert("❌ Registration failed. Try again.");
        }
    };

    return (
        <div className="register-user">
            <input ref={textName} placeholder="Username" className="input" type="text" />
            <input ref={textPwd} placeholder="Password" className="input" type="password" id="regPassword" />
            <button className="create" id="createAccountBtn" onClick={handleRegister}>
                Create new account
            </button>
        </div>
    );
};

export default RegisterUser;
