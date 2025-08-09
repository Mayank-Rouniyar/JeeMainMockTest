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
      setTopicsInput(value); // free typing with commas
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
      alert("Test updated successfully! ✅");
      console.log(res.data);
      navigate("/adminDashboard")
    } catch (error) {
      console.error("Failed to update test", error);
      alert("Update failed ❌");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Update Test</h1>

      <label className="block mb-4">
        Select Test:
        <select
          value={selectedTestId}
          onChange={(e) => setSelectedTestId(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
        >
          <option value="">-- Select a test --</option>
          {tests.map((test) => (
            <option key={test._id} value={test._id}>
              {test.title}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block mb-4">
        Year:
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block mb-4">
        Subject:
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block mb-4">
        Duration (in minutes):
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block mb-4">
        Topics (comma-separated):
        <input
          type="text"
          name="topics"
          value={topicsInput}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>

      <button
        onClick={handleUpdate}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Update Test
      </button>
    </div>
  );
};

export default UpdateTest;
