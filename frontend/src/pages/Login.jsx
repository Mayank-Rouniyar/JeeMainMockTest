import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
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
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      console.log("Login Successfull", response.data);
      setTimeout(() => {
        navigate("/dashboard");
      }, 0);
    } catch (error) {
      console.log("Error occured", error);
      setError(error.response?.data.message || "Login Failed Check your username and password");
    }
  };
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    navigate("/adminLogin");
  };
  return (
  <div className="fixed inset-0 overflow-hidden bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center">
    <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Login to Your Account
      </h2>

      {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full py-3 font-semibold rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors text-white shadow-lg"
        >
          Login
        </button>
      </form>

      <p
        onClick={handleAdminLogin}
        className="mt-6 text-center text-indigo-300 hover:underline cursor-pointer transition-colors"
      >
        Go to Admin Login
      </p>
    </div>
  </div>
);
};
export default Login;
