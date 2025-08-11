import React, { useState ,useEffect} from "react";
import axios from "axios";
export default function DeleteTestLayout() {
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
        setTest(res.data.data.reverse())
      } catch (error) {
        console.log("Failed to Fetch Data for test", error);
      }
    };
    fetchAllTests();
  }, []);
  const deleteTest=async(e)=>{
 try {
     const token=localStorage.getItem("accessToken")
     const res=await axios.delete(`https://test-backend-e908.onrender.com/api/v1/tests/${selectedTestId}`,
       {
       headers:{
           Authorization:`Bearer ${token}`
       }
      }
    )
    console.log("Test Succesffuly deleted",res)
 } catch (error) {
    console.log("An Error occured while deleting tets",error)
 }
  }
  const handleRefresh=(e)=>{
    e.preventDefault()
    window.location.assign(window.location.href);
  }
  return (
  <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] p-6 overflow-auto">
    <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 space-y-6 text-white">
      <h2 className="text-3xl font-extrabold text-indigo-300">Delete Test</h2>

      <div className="space-y-4">
        <label className="block text-sm font-semibold">
          Choose a test to delete
        </label>
        <select
          value={selectedTestId}
          onChange={(e) => setSelectedTestId(e.target.value)}
          className="w-full rounded-lg px-4 py-3 bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="" className="text-black">
            Select Test
          </option>
          {test.map((t) => (
            <option key={t._id} value={t._id} className="text-black">
              {t.title}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-4">
          <button
            onClick={deleteTest}
            disabled={!selectedTestId}
            className={`px-5 py-3 rounded-xl font-semibold shadow-lg transition ${
              selectedTestId
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gray-400 cursor-not-allowed text-gray-700"
            }`}
          >
            Delete Selected Test
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
            <h3 className="text-xl font-semibold mb-3">Confirm Delete</h3>
            <p className="mb-6 text-gray-700 text-sm">
              Are you sure you want to permanently delete this test? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);
}
