import { useNavigate, useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score;
  const handleGetBack = () => {
    navigate("/dashboard");
  };
  return (
  <div className="fixed inset-0 z-50 bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center p-6 text-white">
    <div className="w-full max-w-md p-8 rounded-3xl bg-white/6 backdrop-blur-xl border border-white/10 shadow-2xl">
      <h1 className="text-3xl font-extrabold mb-2 text-green-400">
        ✅ Test Submitted!
      </h1>

      <p className="text-sm text-gray-300">Your Score</p>

      <div className="mt-6 flex items-center justify-center">
        <div className="px-8 py-6 rounded-2xl bg-white/10 shadow-inner">
          <p className="text-6xl font-extrabold text-indigo-200">
            {score ?? "Loading..."}
          </p>
        </div>
      </div>

      <button
        onClick={handleGetBack}
        className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform"
      >
        Get Back To Dashboard
      </button>
    </div>
  </div>
);
};

export default Result;
