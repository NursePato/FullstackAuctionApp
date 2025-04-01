

export const Login = async (username, password) => {
    const url = `http://localhost:5120/api/Login?username=${username}&password=${password}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("❌ Login failed: " + response.statusText);
        }

        const data = await response.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            console.log("✅ Login successful, token stored:", data.token);
            return data.token;
        } else {
            throw new Error("❌ No token received from server.");
        }
    } catch (error) {
        console.error("❌ Error logging in:", error);
        return null;
    }
};

export const RegisterUser = async (username, password) => {
    const url = `http://localhost:5120/api/registerUser?username=${encodeURIComponent(username)}&userpassword=${encodeURIComponent(password)}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                // No "Content-Type" needed, using query parameters, not JSON body
            },
        });

        if (!response.ok) {
            throw new Error("❌ Registration failed: " + response.statusText);
        }

        const data = await response.text(); // Since backend returns plain text
        console.log("✅ User registered successfully:", data);
        return data;
    } catch (error) {
        console.error("❌ Error registering user:", error);
        return null;
    }
};

export const UpdateUser = async (userId, username, password) => {
    const url = `http://localhost:5120/api/UpdateUser`;

    const userData = {
        userId: userId,
        userName: username,
        userPassword: password,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error("❌ Update failed: " + response.statusText);
        }

        const data = await response.text();
        console.log("✅ User updated successfully:", data);
        return data;
    } catch (error) {
        console.error("❌ Error updating user:", error);
        return null;
    }
};
