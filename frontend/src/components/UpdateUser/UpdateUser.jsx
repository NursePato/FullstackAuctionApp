import { useContext, useRef } from "react";
import { UsersContext } from "../../contexts/UsersProvider";

const UpdateUser = () => {
    const { user, updateUser } = useContext(UsersContext);
    const textName = useRef();
    const textPwd = useRef();

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (!user || !user.userId) {
            console.error("❌ Cannot update: User ID is missing");
            return;
        }

        await updateUser(user.userId, textName.current.value, textPwd.current.value);
    };

    return (
        <div>
            <input ref={textName} placeholder="New Username" className="input" type="text" />
            <input ref={textPwd} placeholder="New Password" className="input" type="password" />
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default UpdateUser;
