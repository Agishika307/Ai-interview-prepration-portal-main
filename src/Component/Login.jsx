import { useState } from "react";
import logo from "../assets/image.png";


function Login({ setIsRegister, setIsLogin }) {


    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");


const handleLogin = () => {

    if (username === "" || password === "") {

        setError("Please enter username and password");
        return;

    }

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
        savedUser &&
        savedUser.username === username &&
        savedUser.password === password
    ) {

        setError("");

localStorage.setItem("loggedInUser", JSON.stringify(savedUser));

setIsLogin(true);

    } else {

        setError("Invalid username or password");

    }

};


    return (

        <div className="auth">


            <div className="login-box">


                <img

                    src={logo}

                    alt="Company Logo"

                    className="company-logo"

                />



                <h1>

                    AI Interview Portal

                </h1>




                <input

                    type="text"

                    placeholder="Enter Username"

                    value={username}

                    onChange={(e)=>setUsername(e.target.value)}

                />




                <input

                    type="password"

                    placeholder="Enter Password"

                    value={password}

                    onChange={(e)=>setPassword(e.target.value)}

                />





                <button onClick={handleLogin}>

                    Login

                </button>





                {
                    error &&

                    <p style={{
                        color:"red",
                        marginTop:"15px"
                    }}>

                        {error}

                    </p>

                }





                <p>

                    Don't have an account?

                    <span

                    onClick={()=>setIsRegister(true)}

                    >

                        Register

                    </span>


                </p>




            </div>


        </div>

    );

}


export default Login;