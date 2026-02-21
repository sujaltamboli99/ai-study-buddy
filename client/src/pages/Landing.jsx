import dashboardPreview from "../assets/dashboard.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">

      {/* ================= NAVBAR ================= */}
      <div className="flex justify-between items-center px-10 py-6">
        <h1 className="text-xl font-semibold tracking-tight">
          AI Study Buddy
        </h1>

        <div className="flex items-center gap-6 text-sm font-medium">
          <a href="/login" className="hover:opacity-70 transition">
            Login
          </a>
          <a
            href="/signup"
            className="px-5 py-2 bg-black text-white rounded-full hover:opacity-90 transition"
          >
            Sign Up
          </a>
        </div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <div className="flex flex-1 flex-col justify-center items-center text-center px-6">

        <h2 className="text-5xl md:text-6xl font-semibold leading-tight max-w-4xl">
          Your Personal AI Study Assistant.
        </h2>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl">
          Generate notes. Take adaptive quizzes. Create flashcards.
          Track your performance — all powered by intelligent AI.
        </p>

        <div className="mt-10 flex gap-6">
          <a
            href="/signup"
            className="px-8 py-3 bg-black text-white rounded-full text-sm font-medium hover:opacity-90 transition"
          >
            Get Started
          </a>

          <a
            href="/login"
            className="px-8 py-3 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-100 transition"
          >
            Login
          </a>
        </div>

      </div>

      {/* ================= PRODUCT PREVIEW ================= */}
      <div className="px-6 pb-24">
        <div className="max-w-6xl mx-auto mt-20 rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transition hover:shadow-3xl">

          <img
            src={dashboardPreview}
            alt="Dashboard Preview"
            className="w-full h-auto object-cover"
          />

        </div>
      </div>

    </div>
  );
}