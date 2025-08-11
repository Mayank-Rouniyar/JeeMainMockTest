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
    alert("Test Published Successfully")
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
  <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] p-6 overflow-auto">
    <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 space-y-6 text-white">
      <h2 className="text-3xl font-extrabold text-indigo-300">Publish Test</h2>

      <div className="space-y-4">
        <label className="block text-sm font-semibold">
          Choose a test to publish
        </label>
        <select
          value={selectedTestId}
          onChange={(e) => setSelectedTestId(e.target.value)}
          className="w-full rounded-lg px-4 py-3 bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="" className="text-black">
            Select Test
          </option>
          {test
            .filter((t) => !t.isPublished)
            .map((t) => (
              <option key={t._id} value={t._id} className="text-black">
                {t.title} (Not Published)
              </option>
            ))}
        </select>

        <div className="flex items-center gap-4">
          <button
            onClick={handlePublish}
            disabled={!selectedTestId}
            className={`px-5 py-3 rounded-xl font-semibold shadow-lg transition ${
              selectedTestId
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-400 cursor-not-allowed text-gray-700"
            }`}
          >
            Publish Selected Test
          </button>

          <button
            onClick={handleRefresh}
            className="px-4 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition text-white"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-11/12 shadow-xl text-gray-900">
            <h3 className="text-xl font-semibold mb-3">Confirm Publish</h3>
            <p className="mb-6 text-gray-700 text-sm">
              Are you sure you want to publish this test? Once published, it will
              be visible to all students.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPublish}
                className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              >
                Yes, Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);
}
