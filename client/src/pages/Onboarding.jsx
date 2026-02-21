import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

const Onboarding = () => {
  const navigate = useNavigate();
  const { updateUser, user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");

  const [subjectInput, setSubjectInput] = useState("");
  const [subjects, setSubjects] = useState([]);

  /* ================= ADD SUBJECT ================= */
  const addSubject = () => {
    if (subjectInput.trim() === "") return;

    if (!subjects.includes(subjectInput.trim())) {
      setSubjects([...subjects, subjectInput.trim()]);
    }

    setSubjectInput("");
  };

  /* ================= REMOVE SUBJECT ================= */
  const removeSubject = (sub) => {
    setSubjects(subjects.filter((s) => s !== sub));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !course || !year || subjects.length === 0) {
      alert("Please fill all fields and add at least one subject");
      return;
    }

    try {
      const res = await API.put("/auth/onboarding", {
        name,
        course,
        year,
        subjects,
      });

      updateUser(res.data.user);
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Onboarding failed. Check backend.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[500px]">
        <h2 className="text-2xl font-bold mb-6">
          Complete Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Course (e.g. B.Tech CSE)"
            className="w-full p-3 border rounded-lg"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />

          <input
            type="text"
            placeholder="Year (e.g. 2nd Year)"
            className="w-full p-3 border rounded-lg"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          {/* SUBJECT INPUT */}
          <div>
            <p className="font-medium mb-2">Add Subjects</p>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter subject (e.g. DBMS)"
                className="flex-1 p-3 border rounded-lg"
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
              />

              <button
                type="button"
                onClick={addSubject}
                className="px-4 py-3 bg-purple-500 text-white rounded-lg"
              >
                Add
              </button>
            </div>

            {/* SUBJECT TAGS */}
            <div className="flex flex-wrap gap-2 mt-3">
              {subjects.map((sub, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full flex items-center gap-2"
                >
                  {sub}
                  <span
                    className="cursor-pointer text-sm"
                    onClick={() => removeSubject(sub)}
                  >
                    ✕
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-3 rounded-lg"
          >
            Continue
          </button>

        </form>
      </div>
    </div>
  );
};

export default Onboarding;