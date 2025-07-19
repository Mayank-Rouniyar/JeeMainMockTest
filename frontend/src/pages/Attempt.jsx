import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BACKEND_URL = "http://localhost:3000"; // Change this to your actual backend URL

const Attempt = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(0);
  const timerRef = useRef(null);

  const fetchTest = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axios.get(
        `${BACKEND_URL}/api/v1/tests/${testId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const testData = res.data.data;
      setTest(testData);
      setQuestionTimeLeft(testData.questions[0]?.time || 60); // Default to 60s if time not found
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTest();
  }, []);

  useEffect(() => {
    if (test && test.questions.length > 0) {
      clearInterval(timerRef.current);
      setQuestionTimeLeft(test.questions[currentQuestionIndex].time || 60);

      timerRef.current = setInterval(() => {
        setQuestionTimeLeft(prev => {
          if (prev <= 1) {
            handleNext();
            return test.questions[currentQuestionIndex + 1]?.time || 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [currentQuestionIndex, test]);

  const handleOptionChange = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.post(
        `${BACKEND_URL}/api/v1/tests/${testId}/submit`,
        { answers: selectedAnswers },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Test submitted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error submitting test", err);
      alert("Error submitting test");
    }
  };

  if (loading) return <div>Loading test...</div>;
  if (error) return <div>Error loading test: {error.message}</div>;
  if (!test || test.questions.length === 0) return <div>No questions found.</div>;

  const currentQuestion = test.questions[currentQuestionIndex];

  return (
    <div style={{ padding: "20px" }}>
      <h2>{test.title}</h2>
      <div>
        <strong>Time Left for this question:</strong> {questionTimeLeft}s
      </div>
      <hr />
      <h3>Question {currentQuestionIndex + 1}:</h3>
      <p>{currentQuestion.questionText}</p>

      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name={`question-${currentQuestion._id}`}
                value={index}
                checked={selectedAnswers[currentQuestion._id] === index}
                onChange={() => handleOptionChange(currentQuestion._id, index)}
              />
              {"  "}
              {option}
            </label>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === test.questions.length - 1}
        >
          Next
        </button>
        <button onClick={handleSubmit} style={{ marginLeft: "20px" }}>
          Submit Test
        </button>
      </div>
    </div>
  );
};

export default Attempt;
