export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-center px-6">
      
      <h1 className="text-5xl font-bold mb-6">
        AI Study Buddy 🚀
      </h1>

      <p className="text-lg max-w-xl mb-10 opacity-90">
        Your intelligent learning companion for notes, quizzes, flashcards,
        and performance tracking.
      </p>

      <div className="flex gap-6">
        <a
          href="/login"
          className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
        >
          Login
        </a>

        <a
          href="/signup"
          className="px-6 py-3 bg-black bg-opacity-30 border border-white rounded-xl font-semibold hover:scale-105 transition"
        >
          Sign Up
        </a>
      </div>

    </div>
  );
}