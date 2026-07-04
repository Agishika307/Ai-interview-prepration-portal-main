function Result({ setPage, result }) {

    if (!result) {
        return (
            <div className="dashboard">
                <h2>No Result Found</h2>

                <button onClick={() => setPage("dashboard")}>
                    Go Home
                </button>
            </div>
        );
    }

    return (

        <div className="dashboard">

            <div className="result-card">

                <h1>🎉 Interview Completed</h1>

                <h2 style={{ marginTop: "20px" }}>
                    Overall Score : {result.overallScore}/10
                </h2>

                <h3 style={{ marginTop: "25px" }}>
                    Technical Score : {result.technicalScore}/10
                </h3>

                <h3>
                    Communication : {result.communicationScore}/10
                </h3>

                <h3>
                    Confidence : {result.confidenceScore}/10
                </h3>

                <br />

                <h3>Strengths</h3>

                <ul>
                    {result.strengths.map((item, index) => (
                        <li key={index}>✅ {item}</li>
                    ))}
                </ul>

                <br />

                <h3>Weaknesses</h3>

                <ul>
                    {result.weaknesses.map((item, index) => (
                        <li key={index}>❌ {item}</li>
                    ))}
                </ul>

                <br />

                <h3>Recommendations</h3>

                <ul>
                    {result.recommendations.map((item, index) => (
                        <li key={index}>📘 {item}</li>
                    ))}
                </ul>

                <br />

                <h3>AI Feedback</h3>

                <p>{result.feedback}</p>

                <button
                    style={{ marginTop: "30px" }}
                    onClick={() => setPage("dashboard")}
                >
                    Practice Again
                </button>

            </div>

        </div>

    );

}

export default Result;