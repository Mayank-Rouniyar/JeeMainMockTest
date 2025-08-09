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
     navigate("/adminDashboard")
     } catch (error) {
        console.log("Some Error occured",error)
     }
     }
return(
   <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6">
  <h2 className="text-2xl font-bold text-center">Create New Test</h2>

  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium mb-1">Title</label>
      <input
        type="text"
        name="title"
        placeholder="Enter test title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Subject</label>
      <input
        type="text"
        name="subject"
        onChange={handleChange}
        value={formData.subject}
        placeholder="Enter subject name"
        className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Topics</label>
      <input
        type="text"
        name="topics"
        onChange={handleChange}
        value={formData.topics}
        placeholder="Enter topics separated by commas"
        className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p className="text-xs text-gray-500 mt-1">Example: Algebra, Calculus, Trigonometry</p>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Year</label>
        <input
          type="number"
          name="year"
          onChange={handleChange}
          value={formData.year}
          placeholder="2025"
          className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Duration (in minutes)</label>
        <input
          type="number"
          name="duration"
          onChange={handleChange}
          value={formData.duration}
          placeholder="e.g. 180"
          className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  </div>

  <div className="pt-4">
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
      onClick={handleSubmit}
    >
      Create Test
    </button>
  </div>
</div>

)
}
export default CreateTest