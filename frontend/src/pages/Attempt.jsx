import { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const Attempt = () => {
  const handleSubmitRef = useRef();
  const navigate = useNavigate();
  const { testId } = useParams();
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef(null);
  const [tests, setTests] = useState(null);
  const [me, setMe] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [error, setError] = useState("");
  const answerArray = useMemo(() => {
    if (!tests) return [];
    return tests.questions.map((_, index) =>
      selectedOptions.hasOwnProperty(index) ? selectedOptions[index] : null
    );
  }, [selectedOptions, tests]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const user = await axios.get("http://localhost:5000/api/v1/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMe(user.data.data);
        console.log("The fetched user detail is", user);
      } catch (error) {
        console.log("Fetching current User Failed");
        setError("Current User fetching failed");
      }
    };
    fetchUser();
  }, []);
  
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `http://localhost:5000/api/v1/tests/${testId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTests(response.data.data);
        console.log("The test response is", response);
        const durationInSeconds = response.data.data.duration * 60;
        setTimeLeft(durationInSeconds);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current);
              handleSubmitRef.current?.();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } catch (error) {
        setError(error);
        console.log("An error occurred while fetching test", error);
      }
    };

    fetchTest();

    return () => {
      clearInterval(timerRef.current);
    };
  }, [testId]);

  const [questionStatus, setQuestionStatus] = useState({});
  const handleOptionSelect = (optionIndex) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQ]: optionIndex,
    }));
  };

  const handleSaveNext = () => {
    setCurrentQ((prev) =>
      prev + 1 < tests.questions.length ? prev + 1 : prev
    );
  };

  const handleMarkReview = () => {
    setQuestionStatus((prev) => ({
      ...prev,
      [currentQ]: "review",
    }));
    setCurrentQ((prev) =>
      prev + 1 < tests.questions.length ? prev + 1 : prev
    );
  };

  const handleClearResponse = () => {
    setSelectedOptions((prev) => {
      const updated = { ...prev };
      delete updated[currentQ];
      return updated;
    });
  };
  const getButtonColor = (index) => {
    if (index === currentQ) return "bg-white text-black border border-black";
    if (questionStatus[index] === "review") return "bg-yellow-500";
    if (selectedOptions.hasOwnProperty[index]) return "bg-blue-500";
    return "bg-gray-500";
  };
  const totalQuestions = tests?.questions?.length || 0;

  const summary = {
    answered: Object.keys(selectedOptions).length,
    markedForReview: Object.values(questionStatus).filter(
      (status) => status === "review"
    ).length,
    notVisited:
      totalQuestions -
      Object.keys(selectedOptions).length -
      Object.keys(questionStatus).length,
    notAnswered:
      totalQuestions -
      Object.keys(selectedOptions).length -
      Object.values(questionStatus).filter((status) => status === "review")
        .length -
      (totalQuestions -
        Object.keys(selectedOptions).length -
        Object.keys(questionStatus).length),
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/submissions/${testId}`,
        { answers: answerArray },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("The submitted test response is ", response);
      navigate(`/test/${testId}/result`, {
        state: {
          score: response.data.data.score,
        },
      });
    } catch (error) {
      console.log("An error occured while submitting", error);
      setError(error);
    }
  };
  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  }, [handleSubmit]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };
  return (
    <div>
      <div className="h-[10vh] w-full flex items-center justify-between px-4 border-b">
        <div>
          <h3 className="text-2xl font-semibold leading-none">
            Created and Maintained by
          </h3>
          <p className="text-xl text-green-600">Mayank Rouniyar</p>
        </div>
        <div className="text-right text-xs leading-tight">
          <p>
            Candidate Name:{" "}
            <span className="font-semibold">{me?.name || "Loading..."}</span>
          </p>
          <p>
            Test Title:{" "}
            <span className="font-semibold">
              {tests?.title || "Loading..."}
            </span>
          </p>
          <p>
            Remaining Time:{" "}
            <span className="font-bold text-blue-600">
              Time Left: {formatTime(timeLeft ?? 0)}
            </span>
          </p>
        </div>
      </div>

      <div className="flex h-[90vh]">
        <div className="w-[70%] p-6 flex flex-col h-full">
          <div className="overflow-y-auto flex-grow">
            <h2 className="text-lg font-bold mb-4">
              Q{currentQ + 1}. {tests?.questions?.[currentQ]?.statement}
            </h2>

            <div className="space-y-2">
              {tests?.questions?.[currentQ]?.type === "MCQ" ? (
                tests?.questions?.[currentQ]?.options?.map((option, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${currentQ}`}
                      value={idx}
                      checked={selectedOptions[currentQ] === idx}
                      onChange={() => handleOptionSelect(idx)}
                    />
                    <label>{option}</label>
                  </div>
                ))
              ) : (
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    className="border p-1 w-40"
                    value={selectedOptions[currentQ] || ""}
                    onChange={(e) =>
                      handleOptionSelect(parseInt(e.target.value))
                    }
                  />
                  <span className="text-gray-600 text-sm">
                    Enter integer answer
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t space-x-4 pb-8">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleSaveNext}
            >
              Save & Next
            </button>
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded"
              onClick={handleMarkReview}
            >
              Mark for Review
            </button>
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={handleClearResponse}
            >
              Clear Response
            </button>
          </div>
        </div>
        <div className="w-[30%] flex flex-col border-l p-4">
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-500"></div>
              <span>Not Answered: {summary.notVisited}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-white border"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span>Answered: {summary.answered}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span>Marked: {summary.markedForReview}</span>
            </div>
          </div>
          <h3 className="font-semibold mb-4">Question Navigation</h3>
          <div className="flex flex-wrap gap-2">
            {tests?.questions?.map((_, index) => (
              <button
                key={index}
                className={`w-10 h-10 rounded-full text-white ${getButtonColor(
                  index
                )}`}
                onClick={() => setCurrentQ(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="mt-auto pb-10">
            <button
              className="px-4 py-2 bg-red-600 text-white rounded"
              onClick={handleSubmit}
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Attempt;
