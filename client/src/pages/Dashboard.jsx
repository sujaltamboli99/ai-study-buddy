import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

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
        <div className="space-y-10">

            {/* ================= GREETING ================= */}
            <div>
                <h1 className="text-3xl font-bold">
                    Welcome back, {user?.name} 👋
                </h1>
                <p className="text-gray-500 mt-1">
                    Track your progress and improve daily.
                </p>
            </div>

            {/* ================= ACTION CARDS ================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Ask AI */}
                <Link
                    to="/chat"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-3xl p-8 shadow-lg hover:scale-105 transition duration-300"
                >
                    <h3 className="text-xl font-semibold mb-2">
                        Ask AI Buddy
                    </h3>
                    <p className="opacity-90 text-sm">
                        Get instant answers to your doubts
                    </p>
                    <p className="mt-6 font-medium">
                        Start Chat →
                    </p>
                </Link>

                {/* Generate Notes */}
                <Link
                    to="/notes"
                    className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-3xl p-8 shadow-lg hover:scale-105 transition duration-300"
                >
                    <h3 className="text-xl font-semibold mb-2">
                        Generate Notes
                    </h3>
                    <p className="opacity-90 text-sm">
                        Turn topics into structured notes
                    </p>
                    <p className="mt-6 font-medium">
                        Create Now →
                    </p>
                </Link>

                {/* Take Quiz */}
                <Link
                    to="/quiz"
                    className="bg-white rounded-3xl p-8 shadow-lg border hover:shadow-xl transition duration-300"
                >
                    <h3 className="text-xl font-semibold mb-2">
                        Take a Quiz
                    </h3>
                    <p className="text-gray-500 text-sm">
                        Test your knowledge & improve
                    </p>
                    <p className="mt-6 font-medium text-blue-600">
                        Start Quiz →
                    </p>
                </Link>

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

            {/* ================= PERFORMANCE + RECENT ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* ================= SUBJECT PERFORMANCE ================= */}
                <div className="bg-white p-6 rounded-3xl shadow-sm">

                    <h2 className="text-xl font-semibold mb-6">
                        Subject Performance
                    </h2>

                    {stats?.subjectStats?.length === 0 && (
                        <p className="text-gray-400">
                            No subject data yet.
                        </p>
                    )}

                    <div className="space-y-5">
                        {stats?.subjectStats?.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-2 text-sm">
                                    <span className="font-medium">
                                        {item.subject}
                                    </span>
                                    <span className="text-purple-600 font-semibold">
                                        {item.average}%
                                    </span>
                                </div>

                                <div className="w-full bg-gray-200 h-2 rounded-full">
                                    <div
                                        className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${item.average}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* ================= RECENT ATTEMPTS ================= */}
                <div className="bg-white p-6 rounded-3xl shadow-sm">

                    <h2 className="text-xl font-semibold mb-6">
                        Recent Attempts
                    </h2>

                    {stats?.recentAttempts?.length === 0 && (
                        <p className="text-gray-400">
                            No attempts yet.
                        </p>
                    )}

                    <div className="space-y-4">
                        {stats?.recentAttempts?.map((attempt, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition"
                            >
                                <div>
                                    <p className="font-medium">
                                        {attempt.subject}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {attempt.topic}
                                    </p>
                                </div>

                                <div className="text-purple-600 font-bold text-lg">
                                    {attempt.percentage}%
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;