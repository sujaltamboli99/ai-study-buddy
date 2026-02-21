import { useState } from "react";
import axios from "axios";

export default function Flashcards() {
  const [subject, setSubject] = useState("DBMS");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [numberOfCards, setNumberOfCards] = useState(5);

  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const generateCards = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/flashcards/generate",
      { subject, topic, difficulty, numberOfCards }
    );

    setCards(res.data);
    setCurrentIndex(0);
    setFlipped(false);
    setKnownCount(0);
    setShowSummary(false);
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
    <div className="flex justify-center py-10 px-4">
      <div className="w-full max-w-md">

        {/* CONFIG CARD */}
        {!cards.length && (
          <div className="bg-white shadow-lg rounded-3xl p-8 space-y-5">

            <h2 className="text-xl font-bold text-center">
              Generate Flashcards
            </h2>

            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 bg-gray-100 rounded-xl"
            >
              <option>DBMS</option>
              <option>DSA</option>
              <option>CN</option>
            </select>

            <input
              type="text"
              placeholder="Enter Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-3 bg-gray-100 rounded-xl"
            />

            <div className="flex gap-2 justify-center">
              {["Easy", "Medium", "Hard"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setDifficulty(lvl)}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    difficulty === lvl
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <select
              value={numberOfCards}
              onChange={(e) => setNumberOfCards(e.target.value)}
              className="w-full p-3 bg-gray-100 rounded-xl"
            >
              <option value={5}>5 Cards</option>
              <option value={10}>10 Cards</option>
            </select>

            <button
              onClick={generateCards}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold"
            >
              Generate
            </button>
          </div>
        )}

        {/* FLASHCARD VIEW */}
        {cards.length > 0 && !showSummary && (
          <div className="bg-white shadow-lg rounded-3xl p-8">

            {/* Progress */}
            <div className="mb-6">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                {currentIndex + 1} / {cards.length}
              </p>
            </div>

            {/* Vertical Card */}
            <div
              onClick={() => setFlipped(!flipped)}
              className="cursor-pointer"
            >
              <div className="relative w-full h-80 transition-transform duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
                }}
              >
                {/* Front */}
                <div
                  className="absolute w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center p-6 text-center"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <h3 className="text-lg font-semibold">
                    {cards[currentIndex].question}
                  </h3>
                </div>

                {/* Back */}
                <div
                  className="absolute w-full h-full bg-purple-100 rounded-2xl flex items-center justify-center p-6 text-center"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden"
                  }}
                >
                  <p>{cards[currentIndex].answer}</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => handleNext(false)}
                className="px-5 py-2 bg-red-500 text-white rounded-lg text-sm"
              >
                Unknown
              </button>

              <button
                onClick={() => handleNext(true)}
                className="px-5 py-2 bg-green-500 text-white rounded-lg text-sm"
              >
                Known
              </button>
            </div>
          </div>
        )}

        {/* SUMMARY */}
        {showSummary && (
          <div className="bg-white shadow-lg rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Session Complete 🎉
            </h2>

            <p className="text-lg mb-2">
              {knownCount} / {cards.length} Known
            </p>

            <p className="text-gray-600 mb-6">
              {Math.round((knownCount / cards.length) * 100)}% Mastery
            </p>

            <button
              onClick={resetSession}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl"
            >
              New Set
            </button>
          </div>
        )}

      </div>
    </div>
  );
}