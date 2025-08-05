import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
    const [user,setUser]=useState([])
    const [test,setTest]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        const fetchAllUsers=async ()=>{
            const token=localStorage.getItem("accessToken");
            console.log("Token is",token)
            try {
                const res=await axios.get("http://localhost:5000/api/v1/users/allUser",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                console.log("Response is",res)
                setUser(res.data.data)
            } catch (error) {
                console.log("Failed to Fetch Data",error)
            }
        }
        fetchAllUsers()
    },[])

     useEffect(()=>{
        const fetchAllTests=async ()=>{
            const token=localStorage.getItem("accessToken");
            try {
                const res=await axios.get("http://localhost:5000/api/v1/tests",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                console.log("Response for all Test",res)
                setTest(res.data.data)
            } catch (error) {
                console.log("Failed to Fetch Data for test",error)
            }
        }
        fetchAllTests()
    },[])
    const handleCreate=()=>{
      navigate("/create")
    }
  return (
    <div className="absolute inset-0 flex overflow-hidden">
  <div className="w-[15%] h-full bg-blue-500">
    <div className="text-white pt-20 pb-20 text-4xl">TEST APP</div>
    <div className="border-t border-b border-gray-400">
        <button className="pb-2  text-white text-xl" onClick={handleCreate}>Create Test</button>
        </div>
         <div className="border-t border-b border-gray-400">
        <button className="pt-2 pb-2 text-white text-xl">Update Test</button>
        </div>
        <div className="border-t border-b border-gray-400">
        <button className="pt-2 pb-2 text-white text-xl">Publish Test</button>
        </div>
        <div className="border-t border-b border-gray-400">
        <button className="pt-2 pb-2 text-white text-xl">Delete Test</button>
        </div>
        <div className="border-t border-b border-gray-400">
        <button className="pt-2 pb-2 text-white text-xl">UnPublish Test</button>
        </div>
  </div>
  <div className="flex-1 bg-gray-100 flex justify-center p-0">
  <div>
    <h1 className="text-6xl text-blue-700 mt-20 text-center">Admin Dashboard</h1>

    <div className="pt-10 text-blue-700 text-left">
      {test.map((t, index) => (
        <div key={t.id} className="bg-white shadow-md rounded-lg p-4 mb-4 w-[600px]">
          <h2 className="text-2xl font-semibold">{t.title}</h2>
          <p className="text-gray-600">Duration: {t.duration} mins</p>
        </div>
      ))}
    </div>
  </div>
</div>


  {/* Right Sidebar (NO absolute here) */}
  <div className="w-[15%] h-full bg-blue-500">
    <h1 className="text-white text-4xl pt-20 pb-20">All Users</h1>
    <div className="w-full border-t border-b border-gray-400 max-h-[60vh] overflow-y-auto px-2 space-y-2">
      {user.map((userItem) => (
        <div
          key={userItem._id}
          className="bg-white text-black p-2 rounded shadow-md"
        >
          <div className="font-semibold">Username: {userItem.username}</div>
          <div className="text-sm">Role: {userItem.role}</div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default AdminDashboard;
