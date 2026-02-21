🚀 AI Study Buddy

Your Personal AI-Powered Learning Assistant

AI Study Buddy is a full-stack AI learning platform that helps engineering students generate structured notes, take adaptive quizzes, create flashcards, and track real performance analytics — all in one intelligent system.

🧠 Problem

Engineering students struggle with:

Scattered learning resources

Inefficient revision methods

No structured note generation

No real performance tracking

Lack of personalized learning support



💡 Solution

AI Study Buddy provides:


🧠 AI Study Chat (instant doubt solving)

📄 Smart Notes Generator (structured & exam-ready)

🎯 Adaptive Quiz Engine (difficulty-based MCQs)

🃏 AI Flashcards (active recall system)

📊 Real Performance Analytics (charts + tracking)

🔐 Secure Authentication + Onboarding

Everything powered by AI + real backend analytics.



🏗 Tech Stack


Frontend


React.js

Tailwind CSS

Recharts (Performance charts)

Context API (Auth management)


Backend


Node.js

Express.js

MongoDB

JWT Authentication


AI Integration


LLM API (OpenAI-compatible endpoint)

Structured JSON output parsing

Prompt-engineered quiz and notes generation


🔥 Key Features


🔐 Secure Auth System

JWT-based login/signup

Protected routes

Persistent login state


📄 AI Notes Generator


Generates:

Definition

Key Points

Example

Exam Tips



🎯 Adaptive Quiz System


Select subject & difficulty

Dynamic question count

Score calculation

Attempt saved to database

Real analytics update



📊 Real Analytics Dashboard


Total quizzes

Average score

Best score

Subject-wise bar chart

Performance trend line chart



🃏 Flashcard Mode


Flip animation

Known/Unknown tracking

Mastery percentage



🏛 Architecture


Frontend (React)
↓
Express API
↓
MongoDB
↓
AI API (LLM)

Modular backend structure with controllers, routes, middleware.

🚀 How To Run


git clone <repo-url>
Backend
cd server
npm install
npm run dev
Frontend
cd client
npm install
npm run dev
Environment Variables (.env)
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
OPENAI_API_KEY=your_api_key


🎬 Demo Flow (For Judges)



Show clean landing page

Login

Generate Notes

Take Quiz

Submit Quiz

Show Analytics update

Flashcard demo

Profile performance view

Demonstrates full learning lifecycle.


⚡ Vibe Log — How AI Accelerated This Build



As encouraged in the hackathon guidelines, AI tools were actively used to accelerate development while maintaining architectural ownership and technical understanding.



🧠 AI Tools Used


ChatGPT

LLM-based prompt engineering workflows

🔑 Key AI Workflows


1️⃣ Backend Architecture Planning

Prompt example:

“Design scalable Express + MongoDB structure for quiz analytics system.”

Result:

Modular routes

Middleware-based auth

Aggregation-powered analytics endpoint



2️⃣ Strict JSON Quiz Generation

Prompt example:

“Generate MCQs strictly in valid JSON without markdown formatting.”

Result:

Reliable JSON parsing

Stable quiz generation

Reduced runtime errors



3️⃣ Authentication Debugging

Used AI to:

Fix JWT 401 issues

Solve refresh-login redirect bug

Improve AuthContext loading logic



4️⃣ Frontend State Persistence

Prompt example:

“How to persist JWT login in React Context without redirect glitch?”

Result:

Added loading state

Stable ProtectedRoute logic

Persistent user session



5️⃣ UI Refinement & Demo Strategy

AI assisted in:

Landing page positioning

Dashboard polish

Chart integration

Hackathon demo optimization



🚀 Impact of AI

AI was used as:

A debugging assistant

An architecture advisor

A prompt-engineering collaborator

A UI/UX refinement guide

It significantly accelerated iteration speed while keeping full control over implementation and understanding.



📈 Future Improvements


Study streak tracking

Gamification system

Leaderboard

Personalized AI recommendations

Cloud deployment



🏁 Conclusion


AI Study Buddy is a complete AI-powered learning ecosystem — not just a chatbot.

It integrates:

Secure authentication

AI-generated learning content

Real analytics tracking

Scalable backend design

Clean modern UI

Built with product thinking and scalable architecture.
