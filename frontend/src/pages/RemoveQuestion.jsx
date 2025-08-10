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
        <div className="p-8">
            <h1 className="text-red-600 text-4xl mb-6 font-bold">
                Delete Question from Test
            </h1>
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Choose Test</label>
                <select
                    value={selectedTestId}
                    onChange={(e) => {
                        const id = e.target.value
                        setSelectedTestId(id)
                        if (id) handleTest(id)
                    }}
                    className="w-full border rounded-lg px-3 py-2"
                >
                    <option value="">Select Test</option>
                    {tests.map((t) => (
                        <option key={t._id} value={t._id}>
                            {t.title}
                        </option>
                    ))}
                </select>
            </div>
            {selectedTestId && (
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                        Choose Question
                    </label>
                    <select
                        value={selectedQuestionId}
                        onChange={(e) => setSelectedQuestionId(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    >
                        <option value="">Select Question</option>
                        {questions.map((q) => (
                            <option key={q._id} value={q._id}>
                                {q.statement.slice(0, 50)}...
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {selectedQuestionId && (
                <div>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Delete Question
                    </button>
                </div>
            )}
        </div>
    )
}

export default RemoveQuestion
