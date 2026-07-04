import { useState } from "react";

function Register({ setIsRegister, setIsLogin }) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {

        if (!username || !email || !password) {
            alert("Please fill all fields.");
            return;
        }

        const user = {
            username,
            email,
            password
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Registration Successful!");

        setIsRegister(false);

    };

    return (

        <div className="auth">

            <div className="login-box">

                <h1>Create Account</h1>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleRegister}>
                    Register
                </button>

                <p>
                    Already have an account?

                    <span onClick={() => setIsRegister(false)}>
                        Login
                    </span>

                </p>

            </div>

        </div>

    );

}

export default Register;