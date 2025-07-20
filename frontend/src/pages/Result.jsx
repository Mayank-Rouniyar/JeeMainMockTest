import { useNavigate, useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score;
  const handleGetBack = () => {
    navigate("/dashboard");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded shadow text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">
          Test Submitted!
        </h1>
        <p className="text-xl">Your Score:</p>
        <p className="text-5xl font-bold text-blue-700 mt-2">
          {score ?? "Loading..."}
        </p>

        <button
          className="mt-8 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleGetBack}
        >
          Get Back To DashBoard
        </button>
      </div>
    </div>
  );
};

export default Result;
