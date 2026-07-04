function Sidebar({ setLogin, setPage }) {

    const logout = () => {

        setLogin(false);

    };

    return (

        <div className="sidebar">

            <div className="profile-img">

                U

            </div>

            <h3>
                User Name
            </h3>

            <p>
                user@gmail.com
            </p>

            <hr style={{ margin: "25px 0" }} />

            <p
                style={{ cursor: "pointer", marginBottom: "18px" }}
                onClick={() => setPage("dashboard")}
            >
                🏠 Dashboard
            </p>

            <p
                style={{ cursor: "pointer", marginBottom: "18px" }}
                onClick={() => setPage("dashboard")}
            >
                📄 Upload Resume
            </p>

            <p
                style={{ cursor: "pointer", marginBottom: "18px" }}
                onClick={() => setPage("jobrole")}
            >
                💼 Job Role
            </p>

            <p
                style={{ cursor: "pointer", marginBottom: "18px" }}
                onClick={() => setPage("interview")}
            >
                🤖 Mock Interview
            </p>

            <p
                style={{ cursor: "pointer", marginBottom: "18px" }}
                onClick={() => setPage("result")}
            >
                📊 Results
            </p>

            <p
                style={{ cursor: "pointer", marginBottom: "18px" }}
            >
                📜 Interview History
            </p>

            <p
                style={{ cursor: "pointer", marginBottom: "18px" }}
            >
                ⚙ Settings
            </p>

            <button
                className="logout-btn"
                onClick={logout}
            >
                Logout
            </button>

        </div>

    );

}

export default Sidebar;