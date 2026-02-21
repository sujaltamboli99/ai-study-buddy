import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH ANALYTICS
  ========================= */
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get("/analytics");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Track your progress and improve daily.
        </p>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">Total Quizzes</p>
          <h2 className="text-3xl font-bold mt-2">
            {stats?.totalQuizzes || 0}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">Average Score</p>
          <h2 className="text-3xl font-bold mt-2">
            {stats?.averageScore || 0}%
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">Best Score</p>
          <h2 className="text-3xl font-bold mt-2">
            {stats?.bestScore || 0}%
          </h2>
        </div>

      </div>

      {/* ================= SUBJECT PERFORMANCE ================= */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Subject Performance
        </h2>

        {stats?.subjectStats?.length === 0 && (
          <p className="text-gray-400">
            No subject data yet.
          </p>
        )}

        <div className="space-y-4">
          {stats?.subjectStats?.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span>{item.subject}</span>
                <span>{item.average}%</span>
              </div>

              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${item.average}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= RECENT ATTEMPTS ================= */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Recent Attempts
        </h2>

        {stats?.recentAttempts?.length === 0 && (
          <p className="text-gray-400">
            No attempts yet.
          </p>
        )}

        <div className="space-y-3">
          {stats?.recentAttempts?.map((attempt, index) => (
            <div
              key={index}
              className="flex justify-between bg-gray-50 p-4 rounded-lg"
            >
              <div>
                <p className="font-medium">{attempt.subject}</p>
                <p className="text-sm text-gray-500">
                  {attempt.topic}
                </p>
              </div>

              <div className="font-semibold text-purple-600">
                {attempt.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;