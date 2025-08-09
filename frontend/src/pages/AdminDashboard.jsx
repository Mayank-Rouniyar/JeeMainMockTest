import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [user, setUser] = useState([]);
  const [test, setTest] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllUsers = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const res = await axios.get(
          "https://test-backend-e908.onrender.com/api/v1/users/allUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data.data);
      } catch (error) {
        console.log("Failed to Fetch Data", error);
      }
    };
    fetchAllUsers();
  }, []);

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
        setTest(res.data.data.reverse()); // latest first
      } catch (error) {
        console.log("Failed to Fetch Data for test", error);
      }
    };
    fetchAllTests();
  }, []);

  const totalPages = Math.ceil(test.length / testsPerPage);
  const paginatedTests = test.slice(
    (currentPage - 1) * testsPerPage,
    currentPage * testsPerPage
  );

  const handleCreate = () => {
    navigate("/create");  
  };
  const handleUpdate=()=>{
    navigate("/update")
  }
  const handleDelete=()=>{
    navigate("/delete")
  }
  const handlePublish=()=>{
    navigate("/publish")
  }
  const handleUnPublish=()=>{
    navigate("/unPublish")
  }
  return (
    <div className="absolute inset-0 flex overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-[15%] h-full bg-blue-500">
        <div className="text-white pt-20 pb-20 text-4xl">TEST APP</div>
        <div className="border-t border-b border-gray-400">
          <button className="pb-2 text-white text-xl" onClick={handleCreate}>
            Create Test
          </button>
        </div>
        <div className="border-t border-b border-gray-400">
          <button className="pt-2 pb-2 text-white text-xl" onClick={handleUpdate}>Update Test</button>
        </div>
        <div className="border-t border-b border-gray-400">
          <button className="pt-2 pb-2 text-white text-xl" onClick={handlePublish}>Publish Test</button>
        </div>
        <div className="border-t border-b border-gray-400">
          <button className="pt-2 pb-2 text-white text-xl" onClick={handleDelete}>Delete Test</button>
        </div>
        <div className="border-t border-b border-gray-400">
          <button className="pt-2 pb-2 text-white text-xl" onClick={handleUnPublish}>UnPublish Test</button>
        </div>
      </div>

      {/* Center Panel */}
      <div className="flex-1 bg-gray-100 flex flex-col items-center p-4">
        <h1 className="text-6xl text-blue-700 mt-10 mb-4 text-center">
          Admin Dashboard
        </h1>

        {/* Scrollable test list */}
        <div
          className="overflow-y-auto w-full max-w-[600px] flex-grow"
          style={{ maxHeight: "65vh" }}
        >
          {paginatedTests.map((t) => (
            <div
              key={t.id}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <h2 className="text-2xl font-semibold">{t.title}</h2>
              <p className="text-gray-600">Duration: {t.duration} mins</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[15%] h-full bg-blue-500">
        <h1 className="text-white text-4xl pt-20 pb-20">All Users</h1>
        <div className="w-full border-t border-b border-gray-400 max-h-[60vh] overflow-y-auto px-2 space-y-2">
          {user.map((userItem) => (
            <div
              key={userItem._id}
              className="bg-white text-black p-2 rounded shadow-md"
            >
              <div className="font-semibold">
                Username: {userItem.username}
              </div>
              <div className="text-sm">Role: {userItem.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
