import { useState } from "react";
import ai from "../services/gemini";

function Jobrole({
    setPage,
    setQuestions,
    setSelectedRole,
    setExperience: setAppExperience,
    resumeText
}) {
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
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

if (!experience) {
    alert("Please select your experience level.");
    return;
}

        setLoading(true);

        try {
const prompt = `
You are an expert technical interviewer.

Candidate Details:

Resume:
${resumeText}

Target Job Role:
${role}

Experience Level:
${experience}

Your task is to generate a personalized mock interview.

Rules:

1. Analyze the uploaded resume carefully.

2. Generate exactly 10 interview questions.

3. Personalize the questions based on:
   - Candidate's projects
   - Technical skills
   - Technologies mentioned
   - Selected job role

4. If Experience Level is "Fresher":
   - Ask beginner to intermediate questions.
   - Focus on concepts and projects.
   - Do not ask questions that require industry experience.
   - Keep the interview suitable for internships and campus placements.

5. If Experience Level is "Experienced":
   - Ask intermediate to advanced questions.
   - Include real-world scenarios.
   - Ask optimization and debugging questions.
   - Include practical development questions.

6. Interview Structure:
   - 6 Technical Questions
   - 2 Project-Based Questions
   - 2 HR/Behavioral Questions

7. Keep every question under 30 words.

8. Return ONLY the questions.
Do not include numbering, headings, explanations, markdown, or any extra text.
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

         catch (error) {

            console.log(error);

            alert("Unable to generate interview questions.");

         }finally {

        setLoading(false);
         }

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
                <h2 style={{ marginTop: "35px" }}>
    Select Experience Level
</h2>

<div className="role-grid">

    <div
        className={`role ${experience === "Fresher" ? "active" : ""}`}
onClick={() => {
    setExperience("Fresher");
    setAppExperience("Fresher");
}}    >
        🎓 Fresher
    </div>

    <div
        className={`role ${experience === "Experienced" ? "active" : ""}`}
        onClick={() => {
    setExperience("Experienced");
    setAppExperience("Experienced");
}}
    >
        💼 Experienced
    </div>

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