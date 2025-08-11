import axios from "axios";
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
const CreateTest=()=>{
    const navigate=useNavigate()
    const [formData,setFormData]=useState({
        title:"",
        subject:"",
        topics:"",
        year:"",
        duration:""
      })
     const handleChange=(e)=>{
     console.log("Event Variable is",e)
     const { name, value } = e.target;
     setFormData(prev => ({ ...prev, [name]: value }));
     }
     const handleSubmit=async(e)=>{
      console.log("Submit Event is ",e)
      e.preventDefault()
      let topic = [];
let t = "";

for (let i = 0; i < formData.topics.length; i++) {
  let ch = formData.topics[i];

  if (ch === ",") {
    t = t.trim();
    if (t.length > 0) topic.push(t);
    t = "";
  } else {
    t += ch;
  }
}
  t = t.trim();
  if (t.length > 0) topic.push(t);

      const payload={
        ...formData,
        topics:topic,
        year:parseInt(formData.year),
        duration:parseInt(formData.duration)
      }
     try {
         const token=localStorage.getItem("accessToken")
         const response=await axios.post(
           "https://test-backend-e908.onrender.com/api/v1/tests",
           payload,
           {
               headers:{
                   Authorization:`Bearer ${token}`,
               },
               withCredentials:true,
           }
         )
        alert("Test Created Successfully")
        navigate("/adminDashboard")
     } catch (error) {
        console.log("Some Error occured",error)
     }
     }
  return (
  <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
    <div className="w-full max-w-2xl p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl space-y-6">
      <h2 className="text-3xl font-extrabold text-center text-indigo-300">
        Create New Test
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter test title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/20 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="Enter subject name"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/20 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Topics</label>
          <input
            type="text"
            name="topics"
            placeholder="Enter topics separated by commas"
            value={formData.topics}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/20 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-indigo-400"
          />
          <p className="text-xs text-gray-300 mt-1">
            Example: Algebra, Calculus, Trigonometry
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <input
              type="number"
              name="year"
              placeholder="2025"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/20 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              placeholder="e.g. 180"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/20 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-indigo-400"
            />
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                     text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform"
        >
          Create Test
        </button>
      </div>
    </div>
  </div>
);
}
export default CreateTest