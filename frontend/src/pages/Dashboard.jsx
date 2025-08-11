import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Dashboard = () => {
  const [tests, setTests] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("The tokens is", token);
        console.log("Payload");
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("Payload is", payload);
        const response = await axios.get(
          "https://test-backend-e908.onrender.com/api/v1/tests/published",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTests(response.data.data);
        console.log("Tests fetched successfullly", response.data);
      } catch (error) {
        console.log("Tests fetching failed", error);
        setError("Failed to load tests");
      }
    };
     const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        "https://test-backend-e908.onrender.com/api/v1/users/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("The response is",res)
      setUser(res.data.data);
    } catch (err) {
      console.log("User fetch failed", err);
    }
  };
    fetchUser()
    fetchTest();
  }, []);
  const handleAttempt = (testId) => {
    navigate(`/attempt/${testId}`);
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  return (
  <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] flex flex-col p-6 overflow-auto">
    
    {/* Header */}
    <div className="flex justify-between items-center mb-6 relative z-[9999]">
      <h1 className="text-3xl font-bold text-white drop-shadow-lg">Available Tests</h1>

      {/* User Dropdown */}
      <div className="flex justify-end items-center space-x-4 p-4 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            User
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white/10 backdrop-blur-xl rounded-lg shadow-lg border border-white/20 z-[9999]">
              <div className="p-3 border-b border-white/20 text-white">
                <p className="text-sm font-semibold">{user.name || "Name not set"}</p>
                <p className="text-sm opacity-80">@{user.username || "username"}</p>
                <p className="text-xs opacity-70">{user.email || ""}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-300 hover:bg-white/10"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Error Message */}
    {error && <p className="text-red-400">{error}</p>}

    {/* Tests Grid */}
    {tests.length === 0 ? (
      <p className="text-gray-200">No tests available at the moment.</p>
    ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-0">
        {tests.map((test) => (
          <div
            key={test._id}
            className="bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-4 border border-white/20 hover:scale-[1.02] transform transition duration-300"
          >
            <h2 className="text-xl font-semibold text-white">{test.title}</h2>
            <p className="text-sm text-gray-200">Subject: {test.subject}</p>
            <p className="text-sm text-gray-200">Duration: {test.duration} min</p>
            <p className="text-sm text-gray-200">Total Marks: {test.totalMarks}</p>

            <button
              onClick={() => handleAttempt(test._id)}
              className="mt-3 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl transition duration-200"
            >
              Attempt Test
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);
};
export default Dashboard;
