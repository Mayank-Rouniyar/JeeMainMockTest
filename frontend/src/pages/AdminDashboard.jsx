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
        setTest(res.data.data.reverse())
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
  const handleFielding=()=>{
    navigate("/addQuestion")
  }
  const handleRemoval=()=>{
    navigate("/removal")
  }
  const handleLogout=()=>{
    localStorage.removeItem("accessToken")
    navigate("/login")
  }
  return (
  <div className="absolute inset-0 flex overflow-hidden bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
    
    <div className="w-[15%] h-full bg-white/10 backdrop-blur-lg border-r border-white/20 flex flex-col items-center">
      <div className="py-10 text-3xl font-extrabold text-indigo-300 tracking-wide">
        TEST APP
      </div>
      <div className="flex flex-col space-y-2 w-full px-2">
        <button className="py-2 rounded-lg hover:bg-white/20 transition" onClick={handleCreate}>Create Test</button>
        <button className="py-2 rounded-lg hover:bg-white/20 transition" onClick={handleUpdate}>Update Test</button>
        <button className="py-2 rounded-lg hover:bg-white/20 transition" onClick={handlePublish}>Publish Test</button>
        <button className="py-2 rounded-lg hover:bg-white/20 transition" onClick={handleDelete}>Delete Test</button>
        <button className="py-2 rounded-lg hover:bg-white/20 transition" onClick={handleUnPublish}>UnPublish Test</button>
        <button className="py-2 rounded-lg hover:bg-white/20 transition" onClick={handleFielding}>Add Questions</button>
        <button className="py-2 rounded-lg hover:bg-white/20 transition" onClick={handleRemoval}>Remove Question</button>
      </div>
    </div>
    <div className="flex-1 flex flex-col items-center relative p-6 overflow-hidden">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg"
      >
        Logout
      </button>

      <h1 className="text-5xl font-bold text-indigo-300 mt-14 mb-6 drop-shadow-lg">
        Admin Dashboard
      </h1>

      <div className="overflow-y-auto w-full max-w-[600px] flex-grow space-y-4 px-2" style={{ maxHeight: "65vh" }}>
        {paginatedTests.map((t) => (
          <div key={t.id} className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl p-4 shadow-md hover:scale-[1.02] transition">
            <h2 className="text-2xl font-semibold text-indigo-200">{t.title}</h2>
            <p className="text-gray-300">Duration: {t.duration} mins</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded-lg transition ${
              currentPage === index + 1
                ? "bg-indigo-500 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
    <div className="w-[15%] h-full bg-white/10 backdrop-blur-lg border-l border-white/20 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-indigo-300 py-10">All Users</h1>
      <div className="w-full max-h-[60vh] overflow-y-auto px-3 space-y-3">
        {user.map((userItem) => (
          <div
            key={userItem._id}
            className="bg-white/10 backdrop-blur-lg border border-white/10 text-white p-3 rounded-lg shadow-md"
          >
            <div className="font-semibold">Username: {userItem.username}</div>
            <div className="text-sm text-gray-300">Role: {userItem.role}</div>
          </div>
        ))}
      </div>
    </div>

  </div>
);
};

export default AdminDashboard
