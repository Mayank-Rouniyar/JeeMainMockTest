import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const change = function (prev) {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    };
    setFormData(change);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "https://test-backend-e908.onrender.com/api/v1/users/login",
        formData
      );
      console.log("The reaponse is", response);
      const user=response.data.data.safeUser
      if(user.role!=="ADMIN")
      {
        setError("Access Denied you are not an Admin")
        return
      }
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      console.log("Login Successfull", response.data);
      setTimeout(() => {
        navigate("/adminDashboard");
      }, 0);
    } catch (error) {
      console.log("Error occured", error);
      setError(error.response?.data.message || "Login Failed check your credentials");
    }
  };
  return (
  <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
    <div className="w-full max-w-md p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl">
      <h2 className="text-3xl font-extrabold text-center text-indigo-300 mb-6">
        Login to Your Account
      </h2>

      {error && (
        <p className="text-red-400 text-sm text-center mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full py-2 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform"
        >
          Login
        </button>
      </form>
    </div>
  </div>
);
};
export default AdminLogin;
