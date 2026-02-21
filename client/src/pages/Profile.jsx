export default function Profile() {
  return (
    <div className="p-8">

      {/* ================= PROFILE CARD ================= */}
      <div className="bg-white rounded-3xl shadow-lg p-10 flex items-center gap-8 max-w-4xl">

        {/* Avatar */}
        <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-md">
          A
        </div>

        {/* User Info */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Alex Morgan
          </h2>

          <p className="text-gray-500 text-lg mt-2">
            Computer Engineering Student
          </p>

          <p className="text-gray-400 mt-1">
            Member since Feb 2026
          </p>
        </div>

      </div>

    </div>
  );
}