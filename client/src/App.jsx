import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Notes from "./pages/Notes";
import Chat from "./pages/Chat";
import Quiz from "./pages/Quiz";
import Analytics from "./pages/Analytics";
import Flashcards from "./pages/Flashcards";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="notes" element={<Notes />} />
          <Route path="chat" element={<Chat />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/flashcards" element={<Flashcards />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;