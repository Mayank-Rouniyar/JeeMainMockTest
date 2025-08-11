import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UpdateTest = () => {
  const navigate=useNavigate()
  const [tests, setTests] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    subject: "",
    duration: "",
  });
  const [topicsInput, setTopicsInput] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const res = await axios.get("https://test-backend-e908.onrender.com/api/v1/tests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTests(res.data.data);
      } catch (error) {
        console.error("Failed to fetch tests", error);
      }
    };

    fetchTests();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "topics") {
      setTopicsInput(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    if (!selectedTestId) {
      alert("Please select a test to update.");
      return;
    }

    const payload = {};

    // Only send fields that are not empty
    for (const key in formData) {
      if (formData[key].trim() !== "") {
        payload[key] = formData[key].trim();
      }
    }

    // Handle topics separately
    if (topicsInput.trim() !== "") {
      const topicsArray = topicsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      payload.topics = topicsArray;
    }

    const token = localStorage.getItem("accessToken");

    try {
      const res = await axios.patch(
        `https://test-backend-e908.onrender.com/api/v1/tests/${selectedTestId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Test updated successfully!");
      console.log(res.data);
      navigate("/adminDashboard")
    } catch (error) {
      console.error("Failed to update test", error);
      alert("Update failed");
    }
  };
  return (
  <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-4 overflow-auto">
    <div className="w-full max-w-xl max-h-[90vh] p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-6 overflow-y-auto">
      <h1 className="text-4xl font-extrabold text-indigo-300 text-center">
        Update Test
      </h1>

      <label className="block">
        <span className="text-sm font-medium mb-1 block">Select Test:</span>
        <select
          value={selectedTestId}
          onChange={(e) => setSelectedTestId(e.target.value)}
          className="w-full mt-1 p-3 rounded-md bg-white/5 border border-white/20 
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-indigo-400"
        >
          <option value="" className="text-black">-- Select a test --</option>
          {tests.map((test) => (
            <option key={test._id} value={test._id} className="text-black">
              {test.title}
            </option>
          ))}
        </select>
      </label>

      {["title", "year", "subject", "duration"].map((field) => (
        <label key={field} className="block">
          <span className="text-sm font-medium mb-1 block capitalize">
            {field === "duration" ? "Duration (minutes)" : field}
          </span>
          <input
            type={field === "year" || field === "duration" ? "number" : "text"}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-md bg-white/5 border border-white/20 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-indigo-400"
            placeholder={`Enter ${field}`}
          />
        </label>
      ))}

      <label className="block">
        <span className="text-sm font-medium mb-1 block">Topics (comma-separated):</span>
        <input
          type="text"
          name="topics"
          value={topicsInput}
          onChange={handleChange}
          className="w-full mt-1 p-3 rounded-md bg-white/5 border border-white/20 
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-indigo-400"
          placeholder="Algebra, Calculus, Geometry"
        />
      </label>

      <button
        onClick={handleUpdate}
        className="w-full py-3 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                   text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform"
      >
        Update Test
      </button>
    </div>
  </div>
);
};

export default UpdateTest;
