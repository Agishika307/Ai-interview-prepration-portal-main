import { useState } from "react";
import ai from "../services/gemini";

function Interview({
    setPage,
    questions,
    answers,
    setAnswers,
    setResult
}) {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState("");

    const nextQuestion = async () => {

        if (answer.trim() === "") {
            alert("Please enter your answer.");
            return;
        }

        const currentAnswer = {
            question: questions[currentQuestion],
            answer: answer
        };

        const updatedAnswers = [...answers, currentAnswer];

        setAnswers(updatedAnswers);

        if (currentQuestion < questions.length - 1) {

            setCurrentQuestion(currentQuestion + 1);
            setAnswer("");

        } else {

            try {

                const prompt = `
You are an expert technical interviewer.

Evaluate the following interview honestly.

${JSON.stringify(updatedAnswers)}

Return ONLY valid JSON.

{
  "overallScore": 0,
  "technicalScore": 0,
  "communicationScore": 0,
  "confidenceScore": 0,
  "strengths": [],
  "weaknesses": [],
  "recommendations": [],
  "feedback": ""
}
`;

                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: prompt
                });

                const cleanText = response.text
                    .replace(/```json/g, "")
                    .replace(/```/g, "")
                    .trim();

                const aiResult = JSON.parse(cleanText);

                setResult(aiResult);

                setPage("result");

            } catch (error) {

                console.log(error);

                alert("Unable to evaluate interview.");

            }

        }

    };

    return (

        <div className="dashboard">

            <div className="interview-card">

                <h2>
                    Question {currentQuestion + 1} of {questions.length}
                </h2>

                <div className="progress">

                    <div
                        className="progress-fill"
                        style={{
                            width: `${((currentQuestion + 1) / questions.length) * 100}%`
                        }}
                    ></div>

                </div>

                <p className="question">
                    {questions[currentQuestion]}
                </p>

                <textarea
                    className="answer-box"
                    placeholder="Type your answer here..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                ></textarea>

                <button
                    disabled={answer.trim() === ""}
                    style={{ marginTop: "25px" }}
                    onClick={nextQuestion}
                >
                    {currentQuestion === questions.length - 1
                        ? "Finish Interview"
                        : "Next Question"}
                </button>

            </div>

        </div>

    );

}

export default Interview;