import { useState,useEffect } from "react";
import axios from "axios";
const Fielding = () => {
  const [questionType, setQuestionType] = useState("MCQ");
  const [problemStatement, setProblemStatement] = useState("");
  const [explanation,setExplanation]=useState("")
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);
  const [correctNumericalAnswer, setCorrectNumericalAnswer] = useState("");
  const [selectedTestId,setSelectedTestId]=useState("")
  const [test,setTest]=useState([])
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
    useEffect(() => {
      const fetchAllTests = async () => {
        const token = localStorage.getItem("accessToken");
        try {
          const res = await axios.get(
            "https://test-backend-e908.onrender.com/api/v1/tests",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("All Tests are",res.data.data)
          setTest(res.data.data.reverse())
        } catch (error) {
          console.log("Failed to Fetch Data for test", error);
        }
      };
      fetchAllTests();
    }, []);
  const handleSubmit=async()=>{
    const token=localStorage.getItem("accessToken")
    console.log("Token is",token)
  try {
    let payload;
    if(questionType==="MCQ")
    {
      payload={
        statement:problemStatement,
        type:questionType,
        explanation,
        options,
        correctAnswerIndex:correctOption,
      }
    }
    else
    {
      payload={
        statement:problemStatement,
        type:questionType,
        explanation,
        correctAnswer:correctNumericalAnswer
      }
    }
    const res=await axios.post(`https://test-backend-e908.onrender.com/api/v1/tests/${selectedTestId}/question`,
     payload,
     {
      headers:{
        Authorization:`Bearer ${token}`
      }
     }
    )
    console.log("The response is",res)
  } catch (error) {
    console.log("Error Occured while Adding Question",error)
  }
  }
  return (
    <div className="p-8">
      <h1 className="text-blue-600 text-4xl mb-6">Add Question To Test</h1>
      <div className="space-y-3">
         <label className="block text-sm font-medium">
          Choose a test to Add Question
        </label>
        <select
          value={selectedTestId}
          onChange={(e) => setSelectedTestId(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select Test</option>
          {test
          .map((t) => (
            <option key={t._id} value={t._id}>
              {t.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6 w-full">
        <label className="block text-lg mb-2 font-semibold">Problem Statement:</label>
        <textarea
          placeholder="Write your question statement here"
          value={problemStatement}
          onChange={(e) => setProblemStatement(e.target.value)}
          className="w-full h-36 p-4 border border-gray-300 rounded text-base"
        />
      </div>
      <div className="mb-6 w-full">
        <label className="block text-lg mb-2 font-semibold">Explanation(Optional)</label>
        <textarea
          placeholder="Write your question statement here"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          className="w-full h-36 p-4 border border-gray-300 rounded text-base"
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg mb-2 font-semibold">Question Type:</label>
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          className="p-2 border border-gray-300 rounded text-base"
        >
          <option value="MCQ">MCQ</option>
          <option value="Numerical">Numerical</option>
        </select>
      </div>
      {questionType === "MCQ" ? (
        <div className="mb-6">
          <label className="block text-lg mb-4 font-semibold">Options:</label>
          {options.map((option, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder={`Option ${String.fromCharCode(65 + index)}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))}

          {/* Correct Option Selector */}
          <div className="mt-4">
            <label className="block text-lg mb-2 font-semibold">Correct Option:</label>
            <select
              value={correctOption}
              onChange={(e) => setCorrectOption(parseInt(e.target.value))}
              className="p-2 border border-gray-300 rounded"
            >
              {options.map((_, index) => (
                <option key={index} value={index}>
                  Option {String.fromCharCode(65 + index)}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <label className="block text-lg mb-2 font-semibold">Correct Numerical Answer:</label>
          <input
            type="number"
            value={correctNumericalAnswer}
            placeholder="Enter the correct Answer"
            onChange={(e) => setCorrectNumericalAnswer(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      )}

      <div>
        <button className="border border-gray-300 px-4 py-2" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Fielding;
