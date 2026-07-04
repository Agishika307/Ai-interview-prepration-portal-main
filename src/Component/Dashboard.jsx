import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function Dashboard({ setPage, setResumeText }) {

    const [resume, setResume] = useState(null);

    const handleUpload = async () => {

        if (!resume) {
            alert("Please select a resume first.");
            return;
        }

        try {

            const arrayBuffer = await resume.arrayBuffer();

            const pdf = await pdfjsLib.getDocument({
                data: arrayBuffer
            }).promise;

            let text = "";

            for (let i = 1; i <= pdf.numPages; i++) {

                const page = await pdf.getPage(i);

                const content = await page.getTextContent();

                text += content.items
                    .map(item => item.str)
                    .join(" ");

                text += "\n";
            }

            setResumeText(text);
            console.log(text);
            console.log("Resume Length:", text.length);

            alert("Resume uploaded successfully!");

        }
        catch (error) {

            console.log(error);

            alert("Unable to read resume.");

        }

    };

    return (

    <div className="dashboard">

        <div className="welcome-card">

            <h1>👋 Welcome to PrepAI</h1>

            <p>
                Upload your resume and let AI generate personalized interview
                questions based on your skills, projects, selected job role,
                and experience level.
            </p>

        </div>

        <div className="resume-card">

            <h1>Upload Resume</h1>

            <p>
                Upload your resume to start your AI mock interview.
            </p>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files[0])}
            />

            {resume && (

                <p
                    style={{
                        marginTop: "15px",
                        color: "#16a34a",
                        fontWeight: "600"
                    }}
                >
                    ✅ {resume.name}
                </p>

            )}

            <button onClick={handleUpload}>
                Upload Resume
            </button>

            {resume && (

                <button
                    style={{ marginTop: "15px" }}
                    onClick={() => setPage("jobrole")}
                >
                    Next → Select Job Role
                </button>

            )}

        </div>

        <div className="info-grid">

            <div className="info-card">

                <h2>🚀 How It Works</h2>

                <ul>
                    <li>📄 Upload your Resume</li>
                    <li>💼 Select your Job Role</li>
                    <li>🎓 Choose Experience Level</li>
                    <li>🤖 Start AI Interview</li>
                    <li>📊 View AI Feedback</li>
                </ul>

            </div>

            <div className="info-card">

                <h2>✨ Features</h2>

                <ul>
                    <li>AI Resume Analysis</li>
                    <li>Personalized Questions</li>
                    <li>Technical + HR Interview</li>
                    <li>Experience-based Questions</li>
                    <li>Instant AI Feedback</li>
                </ul>

            </div>

        </div>

    </div>

);

}

export default Dashboard;