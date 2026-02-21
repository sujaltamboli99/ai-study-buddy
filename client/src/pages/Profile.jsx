import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import API from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";

export default function Profile() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get("/analytics");
        setStats(res.data);
      } catch (err) {
        console.error("Analytics error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (!user) return null;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-purple-500"></div>
      </div>
    );
  }

  const firstLetter = user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen p-6 md:p-10">

      {/* ================= HERO ================= */}
      <div className="max-w-7xl mx-auto bg-white rounded-[36px] shadow-lg p-10 flex flex-col md:flex-row items-center justify-between gap-10">

        <div className="flex items-center gap-8">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
            {firstLetter}
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {user.name}
            </h2>

            <p className="text-gray-500 mt-2">
              {user.course} • {user.year}
            </p>

            <p className="text-gray-400 text-sm mt-2">
              {user.email}
            </p>
          </div>
        </div>

        {/* REAL STATS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard label="📝 Total Quizzes" value={stats.totalQuizzes || 0} />
          <StatCard label="📈 Avg Score" value={`${stats.averageScore || 0}%`} />
          <StatCard label="🏆 Best Score" value={`${stats.bestScore || 0}%`} />
        </div>
      </div>

{/* ================= PERFORMANCE ANALYTICS ================= */}
<div className="max-w-7xl mx-auto mt-12 bg-white rounded-[32px] shadow-md p-8">
  <h3 className="text-xl font-semibold mb-8">
    📊 Performance Analytics
  </h3>

  <div className="grid md:grid-cols-2 gap-10">

    {/* Subject Bar Chart */}
    <div>
      <h4 className="font-semibold mb-4 text-gray-700">
        Subject Performance
      </h4>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stats.subjectStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subject" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar
            dataKey="average"
            fill="#7c3aed"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Quiz Trend Line Chart */}
    <div>
      <h4 className="font-semibold mb-4 text-gray-700">
        Recent Quiz Trend
      </h4>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={stats.recentAttempts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="topic" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="percentage"
            stroke="#6366f1"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

  </div>
</div>



      {/* ================= ACCOUNT INFO ================= */}
      <div className="max-w-7xl mx-auto mt-8 bg-white rounded-[32px] shadow-md p-8">
        <h3 className="text-xl font-semibold mb-6">
          ⚙ Account Information
        </h3>

        <div className="space-y-4 text-gray-600">
          <div>
            <p className="text-sm text-gray-400">User ID</p>
            <p className="font-medium break-all">{user._id}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Member Since</p>
            <p className="font-medium">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-purple-50 rounded-2xl px-6 py-4 text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-bold text-purple-600">{value}</p>
    </div>
  );
}