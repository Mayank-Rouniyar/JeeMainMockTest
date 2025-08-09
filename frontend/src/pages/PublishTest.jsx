import React, { useState,useEffect } from "react";
import axios from "axios";
export default function PublishTest() {
  const [selectedTestId, setSelectedTestId] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [test,setTest]=useState([])
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
  const handlePublish=async()=>{
  const token=localStorage.getItem("accessToken")
  try {
    const res=await axios.patch(`https://test-backend-e908.onrender.com/api/v1/tests/publish/${selectedTestId}`,{},
      {
      headers:{
        Authorization:`Bearer ${token}`
      }
     }
    )
    console.log("The response is",res)
  } catch (error) {
   console.log("Error is",error) 
  }
  }
  const handleRefresh=(e)=>{
    e.preventDefault()
    window.location.assign(window.location.href);
    }
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Publish Test</h2>

      <div className="space-y-3">
        <label className="block text-sm font-medium">
          Choose a test to publish
        </label>
        <select
          value={selectedTestId}
          onChange={(e) => setSelectedTestId(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select Test</option>
          {test
          .filter((t) => !t.isPublished)
          .map((t) => (
            <option key={t._id} value={t._id}>
              {t.title} {t.isPublished ? "(Already Published)" : "(Not Published)"}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePublish}
            disabled={!selectedTestId}
            className={`px-4 py-2 rounded-lg shadow-sm text-white ${
              selectedTestId
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Publish Selected Test
          </button>

          <button className="px-3 py-2 rounded-lg border hover:bg-gray-50" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md shadow-lg">
            <h3 className="text-lg font-medium mb-3">Confirm Publish</h3>
            <p className="text-sm text-gray-700 mb-4">
              Are you sure you want to publish this test? Once published, it
              will be visible to all students.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button className="px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700">
                Yes, Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
