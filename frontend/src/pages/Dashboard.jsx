import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Dashboard = () => {
  const [tests, setTests] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("The tokens is", token);
        console.log("Payload")
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log("Payload is",payload);
        const response = await axios.get(
          "http://localhost:5000/api/v1/tests/published",
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
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Available Tests</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {tests.length === 0 ? (
        <p className="text-gray-600">No tests available at the moment.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tests.map((test) => (
            <div
              key={test._id}
              className="bg-white shadow-md rounded-2xl p-4 border border-blue-100"
            >
              <h2 className="text-xl font-semibold text-blue-700">
                {test.title}
              </h2>
              <p className="text-sm text-gray-600">Subject: {test.subject}</p>
              <p className="text-sm text-gray-600">
                Duration: {test.duration} min
              </p>
              <p className="text-sm text-gray-600">
                Total Marks: {test.totalMarks}
              </p>

              <button
                onClick={() => handleAttempt(test._id)}
                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition duration-200"
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
