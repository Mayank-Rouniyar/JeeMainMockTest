# 🧠 JEE Mock Test Platform (MERN Stack)

A full-stack mock test platform inspired by **JEE Main**, built using the **MERN stack**. It replicates a real-exam-like environment where students can take timed tests consisting of MCQ and Numerical questions. It includes features like status-based question navigation, countdown timer, answer tracking, and test submission.

## 🔥 Features

### 🧪 Test Attempt Interface
- ⏲️ Countdown timer (auto-submits when time is over)
- 🔢 Two question types supported:
  - MCQ (Single correct option)
  - Numerical (Only integer input allowed)
- ✅ Dynamic question status updates:
  - Not Visited
  - Not Answered
  - Answered
  - Marked for Review
  - Current
- 🎯 Action buttons:
  - **Save & Next**
  - **Mark for Review**
  - **Clear Response**
  - **Submit Test**
- 💾 Selected answers persist in memory (MCQ as index, Numerical as integer, `null` if unanswered)
- 💡 Responsive and intuitive UI

### 🛠 Admin Panel
> 🛠️ Still under development  
Admin panel to:
- Create/edit/delete tests
- Add/edit/delete questions

## 🚀 Tech Stack

| Frontend      | Backend       | Database   |
|---------------|---------------|------------|
| React.js      | Node.js       | MongoDB    |
| Axios         | Express.js    | Mongoose   |
| React Router  | JWT Auth      |            |

## 📦 Folder Structure

```
project-root/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Attempt.jsx
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── public/
│
└── README.md
```

## ⚙️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Mayank-Rouniyar/JeeMainMockTest.git
cd JeeMainMockTest
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
```
Start the backend server:
```bash
npm run dev
```

### 3️⃣ Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will be running at `http://localhost:5173` (or your chosen port).

## 🔐 Authentication

- Token-based authentication using JWT
- Token is stored in `localStorage` under the key `"token"`
- Protected routes for test access and submission

## 📡 API Reference

### `GET /api/v1/tests/:testId`
Fetch the test by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "test": {
    "title": "JEE Mock Test 1",
    "duration": 180,
    "questions": [...]
  }
}
```

### `POST /api/v1/tests/:testId/submit`
Submit answers for evaluation.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "answers": [1, null, 4, 2, 129]
}
```

**Response:**
```json
{
  "score": 16,
  "total": 30,
  "correctAnswers": [...]
}
```

## 🧠 Logic Summary

- **MCQ Answer Storage:** Index of selected option (0 = A, 1 = B, etc.)
- **Numerical Answer Storage:** Integer only
- **Unanswered:** Stored as `null`
- **Timer Auto-Submission:** Automatically submits test when timer expires

## 📌 Future Enhancements

- Fully functional Admin Dashboard
- Question Review Mode after submission
- Analytics per subject/topic
- Leaderboard and user stats
- Mobile responsiveness improvements

## 🙋‍♂️ Author

**Mayank Rouniyar**  
📍 CSE @ MMMUT (Batch 2027)  

> Feel free to ⭐️ the repo if you found it useful!
