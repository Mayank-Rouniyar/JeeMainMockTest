import { useState,useEffect } from "react";
import axios from "axios";
const AddTest = () => {
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
    alert("Question Added Successfully")
    console.log("The response is",res)
  } catch (error) {
    console.log("Error Occured while Adding Question",error)
  }
  }
  return (
  <div className="fixed inset-0 bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center p-4">
    <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto p-8 text-white">
      <h2 className="text-3xl font-extrabold text-center text-indigo-300 mb-6">
        Add Question To Test
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Choose a test to Add Question</label>
          <select
            value={selectedTestId}
            onChange={(e) => setSelectedTestId(e.target.value)}
            className="w-full p-3 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Test</option>
            {test.map((t) => (
              <option key={t._id} value={t._id} className="bg-[#203a43] text-white">
                {t.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">Problem Statement:</label>
          <textarea
            placeholder="Write your question statement here"
            value={problemStatement}
            onChange={(e) => setProblemStatement(e.target.value)}
            className="w-full h-36 p-4 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">Explanation (Optional):</label>
          <textarea
            placeholder="Write your question explanation here"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            className="w-full h-36 p-4 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">Question Type:</label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="w-full p-3 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="MCQ">MCQ</option>
            <option value="Numerical">Numerical</option>
          </select>
        </div>

        {questionType === "MCQ" ? (
          <div>
            <label className="block text-lg font-semibold mb-4">Options:</label>
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Option ${String.fromCharCode(65 + index)}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full mb-3 p-3 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            ))}

            <label className="block text-lg font-semibold mb-2 mt-4">Correct Option:</label>
            <select
              value={correctOption}
              onChange={(e) => setCorrectOption(parseInt(e.target.value))}
              className="w-full p-3 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {options.map((_, index) => (
                <option key={index} value={index} className="bg-[#203a43] text-white">
                  Option {String.fromCharCode(65 + index)}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label className="block text-lg font-semibold mb-2">Correct Numerical Answer:</label>
            <input
              type="number"
              value={correctNumericalAnswer}
              placeholder="Enter the correct Answer"
              onChange={(e) => setCorrectNumericalAnswer(e.target.value)}
              className="w-full p-3 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-semibold shadow-lg hover:scale-[1.05] transition-transform"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
);
};

export default AddTest;
