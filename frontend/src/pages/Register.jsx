import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://test-backend-e908.onrender.com/api/v1/users/register",
        formData
      );
      console.log("Registration Successfull", response.data);
      navigate("/login");
    } catch (error) {
      console.log("Error occured", error);
      setError(error.response?.data.message || "Registration Failed");
    }
  };
  return (
  <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364]">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 space-y-6 transform transition-all duration-500 hover:scale-[1.02]"
    >
      <h2 className="text-5xl font-extrabold text-center text-white tracking-tight drop-shadow-lg">
        Create an Account
      </h2>

      {error && (
        <p className="text-red-400 text-sm text-center animate-pulse">{error}</p>
      )}

      <input
        className="w-full px-5 py-3 bg-white/5 text-white placeholder-gray-300 border border-white/20 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-400/50 focus:border-indigo-400 backdrop-blur-md transition-all duration-300"
        type="text"
        placeholder="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        className="w-full px-5 py-3 bg-white/5 text-white placeholder-gray-300 border border-white/20 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-400/50 focus:border-indigo-400 backdrop-blur-md transition-all duration-300"
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        className="w-full px-5 py-3 bg-white/5 text-white placeholder-gray-300 border border-white/20 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-400/50 focus:border-indigo-400 backdrop-blur-md transition-all duration-300"
        type="text"
        placeholder="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />

      <input
        className="w-full px-5 py-3 bg-white/5 text-white placeholder-gray-300 border border-white/20 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-400/50 focus:border-indigo-400 backdrop-blur-md transition-all duration-300"
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/50 hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300"
      >
        🚀 Register
      </button>

      <p className="text-center text-sm text-gray-300">
        Already have an account?{" "}
        <span
          className="text-indigo-400 hover:text-pink-400 hover:underline cursor-pointer transition-colors duration-300"
          onClick={() => navigate("/login")}
        >
          Login here
        </span>
      </p>
    </form>
  </div>
);
};
export default Register;
