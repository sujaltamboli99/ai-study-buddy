import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

export default function Flashcards() {
  const { user } = useAuth();

  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [numberOfCards, setNumberOfCards] = useState(5);

  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  /* =========================
     AUTO SELECT FIRST SUBJECT
  ========================= */
  useEffect(() => {
    if (user?.subjects?.length > 0) {
      setSubject(user.subjects[0]);
    }
  }, [user]);

  /* =========================
     GENERATE FLASHCARDS
  ========================= */
  const generateCards = async () => {
    if (!subject || !topic) {
      alert("Please select subject and enter topic");
      return;
    }

    try {
      const res = await API.post("/flashcards/generate", {
        subject,
        topic,
        difficulty,
        numberOfCards,
      });

      setCards(res.data);
      setCurrentIndex(0);
      setFlipped(false);
      setKnownCount(0);
      setShowSummary(false);
    } catch (err) {
      console.error("Flashcard error:", err);
    }
  };

  const handleNext = (known) => {
    if (known) setKnownCount((prev) => prev + 1);

    if (currentIndex + 1 === cards.length) {
      setShowSummary(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setFlipped(false);
    }
  };

  const resetSession = () => {
    setCards([]);
    setShowSummary(false);
    setKnownCount(0);
    setCurrentIndex(0);
  };

  const progress = cards.length
    ? ((currentIndex + 1) / cards.length) * 100
    : 0;

  return (
    <div className="min-h-[80vh] flex items-center justify-center  p-6">
      <div className="w-full max-w-3xl bg-white rounded-[36px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-12 transition-all duration-500">

        {/* ================= SETUP ================= */}
        {!cards.length && (
          <div className="space-y-8">

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">
                Flashcard Studio 📚
              </h2>
              <p className="text-gray-500">
                Master concepts using active recall.
              </p>
            </div>

            {/* SUBJECT PILLS */}
            <div className="flex flex-wrap gap-3 justify-center">
              {user?.subjects?.map((sub, index) => (
                <button
                  key={index}
                  onClick={() => setSubject(sub)}
                  className={`px-5 py-2 rounded-full transition-all duration-300 ${
                    subject === sub
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
              placeholder="Enter Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />

            {/* DIFFICULTY */}
            <div className="flex justify-center gap-4">
              {["Easy", "Medium", "Hard"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setDifficulty(lvl)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    difficulty === lvl
                      ? "bg-purple-100 text-purple-600 scale-105 shadow"
                      : "bg-white border hover:shadow"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* NUMBER OF CARDS */}
            <select
              value={numberOfCards}
              onChange={(e) =>
                setNumberOfCards(Number(e.target.value))
              }
              className="w-full px-6 py-4 rounded-2xl bg-gray-100 focus:outline-none"
            >
              <option value={5}>5 Cards</option>
              <option value={10}>10 Cards</option>
              <option value={15}>15 Cards</option>
            </select>

            <button
              onClick={generateCards}
              className="w-full py-4 rounded-2xl text-white font-semibold bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Generate Flashcards →
            </button>
          </div>
        )}

        {/* ================= STUDY MODE ================= */}
        {cards.length > 0 && !showSummary && (
          <div className="space-y-8">

            {/* PROGRESS */}
            <div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">
                Card {currentIndex + 1} of {cards.length}
              </p>
            </div>

            {/* CARD */}
            <div
              onClick={() => setFlipped(!flipped)}
              className="cursor-pointer perspective"
            >
              <div
                className="relative w-full h-96 transition-transform duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flipped
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)",
                }}
              >
                {/* FRONT */}
                <div
                  className="absolute w-full h-full bg-white border rounded-3xl shadow-lg flex items-center justify-center p-10 text-center"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <h3 className="text-2xl font-semibold">
                    {cards[currentIndex].question}
                  </h3>
                </div>

                {/* BACK */}
                <div
                  className="absolute w-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl shadow-lg flex items-center justify-center p-10 text-center"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <p className="text-lg">
                    {cards[currentIndex].answer}
                  </p>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-center gap-6">
              <button
                onClick={() => handleNext(false)}
                className="px-8 py-3 rounded-2xl bg-red-500 text-white font-semibold shadow-md hover:scale-105 transition"
              >
                Unknown
              </button>

              <button
                onClick={() => handleNext(true)}
                className="px-8 py-3 rounded-2xl bg-green-500 text-white font-semibold shadow-md hover:scale-105 transition"
              >
                Known
              </button>
            </div>
          </div>
        )}

        {/* ================= SUMMARY ================= */}
        {showSummary && (
          <div className="text-center space-y-8">

            <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
              {Math.round((knownCount / cards.length) * 100)}%
            </div>

            <h2 className="text-3xl font-bold">
              Session Complete 🎉
            </h2>

            <div className="bg-gray-50 p-6 rounded-2xl">
              <p className="text-lg font-medium">
                {knownCount} / {cards.length} Mastered
              </p>
            </div>

            <button
              onClick={resetSession}
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              Study Again 🔄
            </button>
          </div>
        )}
      </div>
    </div>
  );
}