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
                            color: "green",
                            fontWeight: "bold"
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

            <div className="cards">

                <div className="card">

                    <h2>12</h2>

                    <p>Mock Interviews</p>

                </div>

                <div className="card">

                    <h2>85%</h2>

                    <p>Best Score</p>

                </div>

                <div className="card">

                    <h2>20</h2>

                    <p>Skills Practiced</p>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;