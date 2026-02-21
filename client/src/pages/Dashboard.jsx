import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/analytics");
        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAnalytics();
  }, []);

  if (!stats) return <div className="p-10">Loading...</div>;

  const strongest =
    stats.subjectStats?.reduce((max, s) =>
      s.average > max.average ? s : max
    ) || { subject: "N/A", average: 0 };

  return (
    <div className="p-8 space-y-10">

      {/* ================= TOP SECTION ================= */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold">
            Welcome back, Alex! 👋
          </h1>
          <p className="text-gray-500 mt-2">
            You have completed 80% of your weekly goal. Keep it up!
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl px-6 py-4 flex items-center gap-4">
          <div className="text-orange-500 text-2xl">⚡</div>
          <div>
            <p className="text-sm text-gray-500">STUDY STREAK</p>
            <p className="text-xl font-bold">12 Days 🔥</p>
          </div>
        </div>
      </div>

      {/* ================= ACTION CARDS ================= */}
      <div className="grid md:grid-cols-3 gap-6">

        <Link to="/chat" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold">Ask AI Buddy</h3>
          <p className="text-sm opacity-80 mt-2">Get instant answers</p>
          <p className="mt-4 font-semibold">Start Chat →</p>
        </Link>

        <Link to="/notes" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold">Generate Notes</h3>
          <p className="text-sm opacity-80 mt-2">Structured study material</p>
          <p className="mt-4 font-semibold">Create Now →</p>
        </Link>

        <Link to="/quiz" className="bg-white p-6 rounded-3xl shadow-lg border hover:shadow-xl transition">
          <h3 className="text-xl font-bold">Take a Quiz</h3>
          <p className="text-sm text-gray-500 mt-2">Test & improve</p>
          <p className="mt-4 font-semibold text-blue-500">Start Quiz →</p>
        </Link>

      </div>

      {/* ================= STATS ROW ================= */}
      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Total Quizzes</p>
          <h2 className="text-2xl font-bold">{stats.totalQuizzes}</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Average Score</p>
          <h2 className="text-2xl font-bold">{stats.averageScore}%</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Best Score</p>
          <h2 className="text-2xl font-bold">{stats.bestScore}%</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Strongest Subject</p>
          <h2 className="text-2xl font-bold">{strongest.subject}</h2>
        </div>

      </div>

      {/* ================= SUBJECT PERFORMANCE ================= */}
      <div className="bg-white p-6 rounded-3xl shadow space-y-5">
        <h2 className="text-xl font-bold">Subject Performance</h2>

        {stats.subjectStats?.map((sub, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm">
              <span>{sub.subject}</span>
              <span>{sub.average}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full mt-1">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${sub.average}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ================= AI RECOMMENDATION ================= */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-3xl shadow">
        <h2 className="text-xl font-bold">AI Recommendation</h2>
        <p className="mt-2 opacity-90">
          Based on your performance, you should practice more in{" "}
          <strong>{stats.subjectStats?.[0]?.subject}</strong>.
          Try taking a quiz or generate flashcards to improve.
        </p>
      </div>

    </div>
  );
}