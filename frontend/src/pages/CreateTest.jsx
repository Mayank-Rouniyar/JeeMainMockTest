import { useState } from "react";

const CreateTest = () => {
  const [questionType, setQuestionType] = useState("MCQ");
  const [problemStatement, setProblemStatement] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0); // index
  const [correctNumericalAnswer, setCorrectNumericalAnswer] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  const handleSubmit=()=>{
  
  }
  return (
    <div className="p-8">
      <h1 className="text-blue-600 text-4xl mb-6">Create Test</h1>

      {/* Problem Statement */}
      <div className="mb-6 w-full">
        <label className="block text-lg mb-2 font-semibold">Problem Statement:</label>
        <textarea
          placeholder="Write your question statement here"
          value={problemStatement}
          onChange={(e) => setProblemStatement(e.target.value)}
          className="w-full h-36 p-4 border border-gray-300 rounded text-base"
        />
      </div>

      {/* Question Type Selector */}
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

      {/* Conditionally Render Based on Question Type */}
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

export default CreateTest;
