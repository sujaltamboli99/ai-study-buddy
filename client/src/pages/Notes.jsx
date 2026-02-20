import { useState } from "react";
import API from "../services/api";
import ReactMarkdown from "react-markdown";

const Notes = () => {
    const [subject, setSubject] = useState("");
    const [topic, setTopic] = useState("");
    const [noteType, setNoteType] = useState("Detailed");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!topic) return;

        try {
            setLoading(true);
            setNotes("");

            const res = await API.post("/ai/notes", {
                topic: `${noteType} notes on ${topic}`,
            });

            setNotes(res.data.notes);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT PANEL */}
                <div className="bg-white p-6 rounded-2xl shadow-md col-span-1">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        📄 Generate Notes
                    </h2>

                    <label className="block text-sm mb-1">Subject</label>
                    <select
                        className="w-full p-3 border rounded-lg mb-4"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    >
                        <option>Select Subject</option>
                        <option>DBMS</option>
                        <option>OS</option>
                        <option>DSA</option>
                    </select>

                    <label className="block text-sm mb-1">Topic</label>
                    <input
                        type="text"
                        placeholder="e.g. Normalization in DBMS"
                        className="w-full p-3 border rounded-lg mb-4"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />

                    <label className="block text-sm mb-2">Note Type</label>
                    <div className="flex gap-2 mb-6">
                        {["Short", "Detailed", "Exam"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setNoteType(type)}
                                className={`px-4 py-2 rounded-lg border ${noteType === type
                                    ? "bg-purple-100 border-purple-400 text-purple-600"
                                    : "bg-gray-100"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleGenerate}
                        className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition"
                    >
                        {loading ? "Generating..." : "Generate Notes"}
                    </button>

            {/* PRO TIP */}
            <div className="mt-8 bg-blue-50 p-6 rounded-2xl shadow-sm">
                <h3 className="font-semibold text-blue-600 mb-2">💡 Pro Tip</h3>
                <p className="text-blue-500 text-sm">
                    For best results, specify the exact chapter or theorem name.
                    Exam-oriented notes focus on definitions and key formulas.
                </p>
            </div>
                    
                </div>

                

                {/* RIGHT PANEL */}
                <div className="bg-gray-50 p-8 rounded-2xl shadow-sm col-span-2 flex flex-col h-[600px]">
                    {!notes && !loading && (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <p className="text-lg font-semibold mb-2">
                                No notes generated yet
                            </p>
                            <p>Select subject and topic to generate notes instantly.</p>
                        </div>
                    )}

                    {loading && (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-purple-500"></div>
                        </div>
                    )}

                    {notes && (
                        <div className="h-full flex flex-col">

                            {/* Success Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-green-600 font-medium">
                                    <span className="text-xl">✔</span>
                                    <span>Generated successfully</span>
                                </div>

                                <div className="flex gap-4 text-gray-400 text-lg">

                                    {/* Copy */}
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(notes);
                                            alert("Copied to clipboard!");
                                        }}
                                        className="hover:text-gray-600"
                                    >
                                        📋
                                    </button>

                                    {/* Download */}
                                    <button
                                        onClick={() => {
                                            const element = document.createElement("a");
                                            const file = new Blob([notes], { type: "text/plain" });
                                            element.href = URL.createObjectURL(file);
                                            element.download = "notes.txt";
                                            document.body.appendChild(element);
                                            element.click();
                                        }}
                                        className="hover:text-gray-600"
                                    >
                                        ⬇
                                    </button>

                                    {/* Share */}
                                    <button
                                        onClick={() => {
                                            if (navigator.share) {
                                                navigator.share({
                                                    title: "Study Notes",
                                                    text: notes,
                                                });
                                            } else {
                                                alert("Sharing not supported on this browser");
                                            }
                                        }}
                                        className="hover:text-gray-600"
                                    >
                                        🔗
                                    </button>

                                </div>
                            </div>

                            {/* Scrollable Notes Content */}
                            <div className="bg-white rounded-xl border p-8 overflow-y-auto flex-1">

                                <div className="prose prose-lg max-w-none bg-white rounded-xl p-10 shadow-sm">
                                    <ReactMarkdown>{notes}</ReactMarkdown>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>


        </div>
    );
};

export default Notes;