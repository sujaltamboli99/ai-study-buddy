import { useState, useEffect } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const Quiz = () => {
    const { user } = useAuth();

    const [subject, setSubject] = useState("");
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [numberOfQuestions, setNumberOfQuestions] = useState(5);

    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState({});
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reviewMode, setReviewMode] = useState(false);

    /* =========================
       AUTO SELECT FIRST USER SUBJECT
    ========================= */
    useEffect(() => {
        if (user?.subjects?.length > 0) {
            setSubject(user.subjects[0]);
        }
    }, [user]);

    /* =========================
       GENERATE QUIZ
    ========================= */
    const generateQuiz = async () => {
        if (!subject || !topic) {
            alert("Please select subject and enter topic");
            return;
        }

        try {
            setLoading(true);

            const res = await API.post("/ai/quiz", {
                subject,
                topic,
                difficulty,
                numberOfQuestions,
            });

            setQuestions(res.data);
            setCurrent(0);
            setSelected({});
            setScore(null);
            setReviewMode(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    /* =========================
       NEXT QUESTION
    ========================= */
    const handleNext = () => {
        if (current < questions.length - 1) {
            setCurrent(current + 1);
        } else {
            calculateScore();
        }
    };

    /* =========================
       CALCULATE SCORE
    ========================= */
    const calculateScore = async () => {
        let correct = 0;

        questions.forEach((q, index) => {
            const correctOption =
                q.options[q.correctAnswer.charCodeAt(0) - 65];

            if (selected[index] === correctOption) correct++;
        });

        setScore(correct);

        try {
            await API.post("/quiz/save", {
                subject,
                topic,
                difficulty,
                score: correct,
                totalQuestions: questions.length,
            });
        } catch (err) {
            console.error("Failed to save attempt:", err);
        }
    };

    /* =========================
       RESET QUIZ
    ========================= */
    const resetQuiz = () => {
        setQuestions([]);
        setScore(null);
        setSelected({});
        setCurrent(0);
        setTopic("");
        setDifficulty("Easy");
        setNumberOfQuestions(5);
        setReviewMode(false);

        if (user?.subjects?.length > 0) {
            setSubject(user.subjects[0]);
        } else {
            setSubject("");
        }
    };

    const progress =
        questions.length > 0
            ? ((current + 1) / questions.length) * 100
            : 0;

    return (
        <div className="min-h-[80vh] flex items-center justify-center  p-6">

            <div className="w-full max-w-3xl bg-white rounded-[36px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-12 transition-all duration-500">

                {/* ================= SETUP FORM ================= */}
                {questions.length === 0 && (
                    <div className="space-y-8">

                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-2">
                                AI Powered Quiz 🚀
                            </h2>
                            <p className="text-gray-500">
                                Test your knowledge instantly with smart generated questions.
                            </p>
                        </div>

                        {/* SUBJECT */}
                        <div className="flex flex-wrap gap-3 justify-center">
                            {user?.subjects?.map((sub, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSubject(sub)}
                                    className={`px-5 py-2 rounded-full transition-all duration-300 ${subject === sub
                                            ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg scale-105"
                                            : "bg-white border hover:shadow-md"
                                        }`}
                                >
                                    {sub}
                                </button>
                            ))}
                        </div>

                        {/* TOPIC */}
                        <input
                            type="text"
                            placeholder="Enter Topic (e.g. Normalization)"
                            className="w-full px-6 py-4 rounded-2xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />

                        {/* DIFFICULTY */}
                        <div className="flex justify-center gap-4">
                            {["Easy", "Medium", "Hard"].map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setDifficulty(level)}
                                    className={`px-6 py-2 rounded-full transition-all duration-300 ${difficulty === level
                                            ? "bg-purple-100 text-purple-600 scale-105 shadow"
                                            : "bg-white border hover:shadow"
                                        }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>

                        {/* NUMBER OF QUESTIONS */}
                        <select
                            className="w-full px-6 py-4 rounded-2xl bg-gray-100 focus:outline-none"
                            value={numberOfQuestions}
                            onChange={(e) =>
                                setNumberOfQuestions(Number(e.target.value))
                            }
                        >
                            <option value={5}>5 Questions</option>
                            <option value={10}>10 Questions</option>
                            <option value={15}>15 Questions</option>
                        </select>

                        <button
                            onClick={generateQuiz}
                            className="w-full py-4 rounded-2xl text-white font-semibold bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 hover:scale-105 transition-all duration-300 shadow-xl"
                        >
                            {loading ? "Generating..." : "Start Quiz →"}
                        </button>

                    </div>
                )}

                {/* ================= QUIZ MODE ================= */}
                {questions.length > 0 && score === null && (
                    <div className="space-y-8">

                        <div className="flex justify-between items-center">
                            <div className="px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold">
                                {current + 1} / {questions.length}
                            </div>

                            <div className="w-1/2 bg-gray-200 h-3 rounded-full overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-lg border">
                            <h3 className="text-xl font-semibold mb-6">
                                {questions[current].question}
                            </h3>

                            <div className="space-y-4">
                                {questions[current].options.map((opt, i) => (
                                    <div
                                        key={i}
                                        onClick={() =>
                                            setSelected({
                                                ...selected,
                                                [current]: opt,
                                            })
                                        }
                                        className={`px-6 py-4 rounded-2xl cursor-pointer transition-all duration-300 border ${selected[current] === opt
                                                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg scale-[1.02]"
                                                : "bg-gray-50 hover:shadow-md hover:scale-[1.01]"
                                            }`}
                                    >
                                        {opt}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition"
                        >
                            {current === questions.length - 1
                                ? "Submit Quiz 🎯"
                                : "Next Question →"}
                        </button>
                    </div>
                )}

                {/* ================= RESULT SCREEN ================= */}
                {score !== null && (
                    <div className="text-center space-y-8">

                        <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                            {Math.round((score / questions.length) * 100)}%
                        </div>

                        <h2 className="text-3xl font-bold">
                            Quiz Completed 🎉
                        </h2>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-green-100 rounded-2xl p-6">
                                <p className="text-green-700 font-semibold">Correct</p>
                                <p className="text-3xl font-bold">{score}</p>
                            </div>

                            <div className="bg-red-100 rounded-2xl p-6">
                                <p className="text-red-700 font-semibold">Incorrect</p>
                                <p className="text-3xl font-bold">
                                    {questions.length - score}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center gap-6 mt-6 flex-wrap">

                            <button
                                onClick={resetQuiz}
                                className="px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transition"
                            >
                                Try Again 🔄
                            </button>

                            <button
                                onClick={() => setReviewMode(!reviewMode)}
                                className="px-10 py-4 rounded-2xl border border-purple-400 text-purple-600 font-semibold hover:bg-purple-50 transition"
                            >
                                {reviewMode ? "Hide Review" : "Review Answers 📖"}
                            </button>

                        </div>

                        {reviewMode && (
                            <div className="mt-10 space-y-6 text-left">
                                {questions.map((q, index) => {
                                    const correctOption =
                                        q.options[q.correctAnswer.charCodeAt(0) - 65];

                                    const userAnswer = selected[index];
                                    const isCorrect = userAnswer === correctOption;

                                    return (
                                        <div
                                            key={index}
                                            className="bg-gray-50 p-6 rounded-2xl border"
                                        >
                                            <h4 className="font-semibold mb-3">
                                                Q{index + 1}. {q.question}
                                            </h4>

                                            <p className={`mb-2 ${isCorrect ? "text-green-600" : "text-red-600"
                                                }`}>
                                                Your Answer: {userAnswer || "Not Answered"}
                                            </p>

                                            {!isCorrect && (
                                                <p className="text-green-600">
                                                    Correct Answer: {correctOption}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                    </div>
                )}

            </div>
        </div>
    );
};

export default Quiz;