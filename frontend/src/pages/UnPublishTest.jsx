import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UnPublishTest() {
  const [selectedTestId, setSelectedTestId] = useState("");
  const [test, setTest] = useState([]);

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
      alert("Test Successfully UnPublished")
    } catch (error) {
      console.log("Error is", error);
    }
  };
  return (
  <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] p-6 overflow-auto">
    <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 space-y-6 text-white">
      <h2 className="text-3xl font-extrabold text-indigo-300">UnPublish Test</h2>

      <div className="space-y-4">
        <label className="block text-sm font-semibold">Choose a test to UnPublish</label>
        <select
          value={selectedTestId}
          onChange={(e) => setSelectedTestId(e.target.value)}
          className="w-full rounded-lg px-4 py-3 bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="" className="text-black">Select Test</option>
          {test
            .filter((t) => t.isPublished === true || t.isPublished === "true")
            .map((t) => (
              <option key={t._id} value={t._id} className="text-black">
                {t.title}
              </option>
            ))}
        </select>

        <div className="flex items-center gap-4">
          <button
            onClick={handleUnPublish}
            disabled={!selectedTestId}
            className={`px-5 py-3 rounded-xl font-semibold shadow-lg transition ${
              selectedTestId
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-400 cursor-not-allowed text-gray-700"
            }`}
          >
            UnPublish Selected Test
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

