import { useState } from "react";
import API from "../services/api";

const Quiz = () => {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    if (!subject || !topic) return;

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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      calculateScore();
    }
  };

const calculateScore = async () => {
  let correct = 0;

  questions.forEach((q, index) => {
    const correctOption =
      q.options[q.correctAnswer.charCodeAt(0) - 65];

    if (selected[index] === correctOption) correct++;
  });

  setScore(correct);

  await API.post("/quiz/save", {
    subject,
    topic,
    difficulty,
    score: correct,
    totalQuestions: questions.length,
  });
};

  const resetQuiz = () => {
    setQuestions([]);
    setScore(null);
    setSelected({});
    setCurrent(0);
    setSubject("");
    setTopic("");
    setDifficulty("Easy");
    setNumberOfQuestions(5);
  };

  const progress =
    questions.length > 0
      ? ((current + 1) / questions.length) * 100
      : 0;

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-2xl shadow-sm p-10 w-full max-w-2xl">

        {/* ================= SETUP FORM ================= */}
        {questions.length === 0 && (
          <div className="space-y-6">

            <h2 className="text-2xl font-bold">
              Generate Quiz
            </h2>

            <select
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">Select Subject</option>
              <option value="DBMS">DBMS</option>
              <option value="DSA">DSA</option>
              <option value="CN">CN</option>
            </select>

            <input
              type="text"
              placeholder="Enter Topic (e.g. Normalization)"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />

            <div className="flex gap-3">
              {["Easy", "Medium", "Hard"].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-4 py-2 rounded-lg border ${
                    difficulty === level
                      ? "bg-purple-100 border-purple-400"
                      : "bg-white"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            <select
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none"
              value={numberOfQuestions}
              onChange={(e) =>
                setNumberOfQuestions(Number(e.target.value))
              }
            >
              <option value={5}>5 Questions</option>
              <option value={10}>10 Questions</option>
            </select>

            <button
              onClick={generateQuiz}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-lg w-full"
            >
              {loading ? "Generating..." : "Start Quiz"}
            </button>
          </div>
        )}

        {/* ================= QUIZ MODE ================= */}
        {questions.length > 0 && score === null && (
          <div>

            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-500 font-semibold">
                QUESTION {current + 1} OF {questions.length}
              </p>

              <div className="w-1/3 bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-6">
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
                  className={`flex items-center px-5 py-4 rounded-xl border cursor-pointer ${
                    selected[current] === opt
                      ? "border-blue-500 bg-blue-50"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="w-5 h-5 border rounded-full mr-4 flex items-center justify-center">
                    {selected[current] === opt && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  {opt}
                </div>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg"
            >
              {current === questions.length - 1
                ? "Submit Quiz"
                : "Next Question"}
            </button>
          </div>
        )}

        {/* ================= RESULT SCREEN ================= */}
{score !== null && (
  <div className="relative pt-6">

    {/* Top Gradient Bar (inside main container) */}
    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl"></div>

    {/* Trophy */}
    <div className="flex justify-center mt-6 mb-6">
      <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center text-3xl">
        🏆
      </div>
    </div>

    {/* Title */}
    <h2 className="text-3xl font-bold text-center mb-3">
      Quiz Completed!
    </h2>

    {/* Score */}
    <p className="text-center text-lg text-gray-600 mb-8">
      You scored{" "}
      <span className="text-blue-600 font-bold text-xl">
        {score}/{questions.length}
      </span>{" "}
      ({Math.round((score / questions.length) * 100)}%)
    </p>

    {/* Correct / Incorrect */}
    <div className="flex justify-center gap-6 mb-8">

      <div className="flex-1 bg-green-100 rounded-2xl p-6 text-center">
        <p className="text-green-700 font-semibold">CORRECT</p>
        <p className="text-3xl font-bold text-green-800">
          {score}
        </p>
      </div>

      <div className="flex-1 bg-red-100 rounded-2xl p-6 text-center">
        <p className="text-red-600 font-semibold">INCORRECT</p>
        <p className="text-3xl font-bold text-red-700">
          {questions.length - score}
        </p>
      </div>

    </div>

    {/* Retry Button */}
    <div className="flex justify-center">
      <button
        onClick={resetQuiz}
        className="px-8 py-3 rounded-xl border bg-gray-100 hover:bg-gray-200 transition"
      >
        🔄 Retry Quiz
      </button>
    </div>

  </div>
)}

      </div>
    </div>
  );
};

export default Quiz;