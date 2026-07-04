import { useState } from "react";
import ai from "../services/gemini";

function Jobrole({
    setPage,
    setQuestions,
    setSelectedRole,
    resumeText
}) {
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);

    const roles = [
        "Frontend Developer",
        "React Developer",
        "MERN Stack Developer",
        "Java Developer",
        "Backend Developer",
        "Python Developer",
        "Full Stack Developer",
        "Data Analyst"
    ]; const startInterview = async () => {

    console.log("Resume Text:", resumeText);
    console.log("Selected Role:", role);

    if (!role) {
        alert("Please select a job role.");
        return;
    }

        setLoading(true);

        try {

            const prompt = `
You are a professional technical interviewer.

Candidate Resume:
${resumeText}

Target Job Role:
${role}

Based ONLY on the resume and the selected job role, generate 10 interview questions.

Requirements:
- Ask about the candidate's projects mentioned in the resume.
- Ask about the candidate's technical skills.
- Ask about technologies used.
- Ask scenario-based questions.
- Include 2 HR questions.
- Do NOT ask generic questions unless they are related to the resume.
- Return only the questions, one per line.
`;
            const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
});

console.log("Prompt Sent:");
console.log(prompt);

console.log("AI Response:");
console.log(response.text);

            const data = response.text
    .split("\n")
    .map(q => q.replace(/^\d+\.\s*/, "").trim())
    .filter(q => q !== "");

            setQuestions(data);

            setSelectedRole(role);

            setPage("interview");
}

        // } catch (error) {

        //     console.log(error);

        //     alert("Unable to generate interview questions.");

        // }
        catch (error) {
    console.error(error);
    alert(error.message);
}

        setLoading(false);

    };

    return (

        <div className="dashboard">

            <div className="job-role-card">

                <h1>Select Your Job Role</h1>

                <p style={{ marginTop: "10px", color: "#64748b" }}>
                    Choose the role you want to prepare for.
                </p>

                <div className="role-grid">

                    {roles.map((item, index) => (

                        <div
                            key={index}
                            className={`role ${role === item ? "active" : ""}`}
                            onClick={() => setRole(item)}
                        >
                            {item}
                        </div>

                    ))}

                </div>

                <button
                    style={{ marginTop: "30px" }}
                    onClick={startInterview}
                >

                    {loading ? "Generating Questions..." : "Start AI Interview"}

                </button>

            </div>

        </div>

    );

}

export default Jobrole;