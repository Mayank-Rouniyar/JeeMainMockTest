import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UnPublishTest() {
  const [selectedTestId, setSelectedTestId] = useState("");
  const [test, setTest] = useState([]);

  // Fetch tests
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
      console.log("Fetched tests:", res.data.data)
      setTest(res.data.data.reverse());
    } catch (error) {
      console.log("Failed to Fetch Data for test", error);
    }
  };

  useEffect(() => {
    fetchAllTests();
  }, []);

  // Handle publish
  const handleUnPublish = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.patch(
        `https://test-backend-e908.onrender.com/api/v1/tests/unPublish/${selectedTestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchAllTests();
      setSelectedTestId(""); 
    } catch (error) {
      console.log("Error is", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">UnPublish Test</h2>

      <div className="space-y-3">
        <label className="block text-sm font-medium">
          Choose a test to UnPublish
        </label>
        <select
          value={selectedTestId}
          onChange={(e) => setSelectedTestId(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select Test</option>
          {test
            .filter((t) => t.isPublished === true || t.isPublished === "true")
            .map((t) => (
              <option key={t._id} value={t._id}>
                {t.title}
              </option>
            ))}
        </select>

        <div className="flex items-center gap-2">
          <button
            onClick={handleUnPublish}
            disabled={!selectedTestId}
            className={`px-4 py-2 rounded-lg shadow-sm text-white ${
              selectedTestId
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            UnPublish Selected Test
          </button>
        </div>
      </div>
    </div>
  );
}

