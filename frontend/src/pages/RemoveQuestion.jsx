import React, { useState, useEffect } from 'react'
import axios from 'axios'

function RemoveQuestion() {
    const [selectedTestId, setSelectedTestId] = useState("")
    const [selectedQuestionId, setSelectedQuestionId] = useState("")
    const [tests, setTests] = useState([])
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        const fetchAllTests = async () => {
            const token = localStorage.getItem("accessToken")
            try {
                const res = await axios.get(
                    "https://test-backend-e908.onrender.com/api/v1/tests",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                setTests(res.data.data.reverse())
            } catch (error) {
                console.log("Error occured while fetching test", error)
            }
        }
        fetchAllTests()
    }, [])

    const handleTest = async (testId) => {
        const token = localStorage.getItem("accessToken")
        try {
            const res = await axios.get(
                `https://test-backend-e908.onrender.com/api/v1/tests/${testId}/with-questions`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setQuestions(res.data.data.questions)
        } catch (error) {
            console.log("Error is", error)
        }
    }

    const handleDelete = async () => {
        const token = localStorage.getItem("accessToken")
        try {
            await axios.delete(
                `https://test-backend-e908.onrender.com/api/v1/tests/${selectedTestId}/questions/${selectedQuestionId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setQuestions(questions.filter(q => q._id !== selectedQuestionId))
            setSelectedQuestionId("")
            alert("Test Successfully Deleted")
        } catch (error) {
            console.log("Error deleting question", error)
        }
    }

    return (
  <div className="fixed inset-0 bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center p-6">
    <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl max-h-[85vh] overflow-y-auto p-8 text-white">
      <h1 className="text-red-500 text-4xl mb-8 font-extrabold text-center">
        Delete Question from Test
      </h1>

      <div className="mb-8">
        <label className="block text-sm font-semibold mb-2">Choose Test</label>
        <select
          value={selectedTestId}
          onChange={(e) => {
            const id = e.target.value;
            setSelectedTestId(id);
            if (id) handleTest(id);
          }}
          className="w-full p-3 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="" className="text-gray-400">Select Test</option>
          {tests.map((t) => (
            <option key={t._id} value={t._id} className="bg-[#203a43] text-white">
              {t.title}
            </option>
          ))}
        </select>
      </div>

      {selectedTestId && (
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-2">Choose Question</label>
          <select
            value={selectedQuestionId}
            onChange={(e) => setSelectedQuestionId(e.target.value)}
            className="w-full p-3 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="" className="text-gray-400">Select Question</option>
            {questions.map((q) => (
              <option key={q._id} value={q._id} className="bg-[#203a43] text-white">
                {q.statement.slice(0, 50)}...
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedQuestionId && (
        <div className="text-center">
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition"
          >
            Delete Question
          </button>
        </div>
      )}
    </div>
  </div>
);
}

export default RemoveQuestion
