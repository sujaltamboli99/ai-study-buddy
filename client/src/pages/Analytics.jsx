import { useEffect, useState } from "react";
import API from "../services/api";

const Analytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/analytics");
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-2xl shadow-sm p-10 w-full max-w-4xl space-y-10">

        {/* Title */}
        <h2 className="text-3xl font-bold">
          Progress Analytics
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6">

          <div className="bg-blue-50 p-6 rounded-xl text-center">
            <p className="text-gray-600">Total Quizzes</p>
            <h3 className="text-3xl font-bold">
              {data.totalQuizzes}
            </h3>
          </div>

          <div className="bg-green-50 p-6 rounded-xl text-center">
            <p className="text-gray-600">Average Score</p>
            <h3 className="text-3xl font-bold">
              {data.averageScore}%
            </h3>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl text-center">
            <p className="text-gray-600">Best Score</p>
            <h3 className="text-3xl font-bold">
              {data.bestScore}%
            </h3>
          </div>

        </div>

        {/* Subject Performance */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Subject Performance
          </h3>

          <div className="space-y-4">
            {data.subjectStats.map((sub, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span>{sub.subject}</span>
                  <span>{sub.average}%</span>
                </div>

                <div className="w-full bg-gray-200 h-3 rounded-full">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: `${sub.average}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Attempts */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Recent Attempts
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-3">Subject</th>
                  <th className="p-3">Topic</th>
                  <th className="p-3">Difficulty</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {data.recentAttempts.map((attempt, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{attempt.subject}</td>
                    <td className="p-3">{attempt.topic}</td>
                    <td className="p-3">{attempt.difficulty}</td>
                    <td className="p-3">
                      {attempt.percentage}%
                    </td>
                    <td className="p-3">
                      {new Date(
                        attempt.createdAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;