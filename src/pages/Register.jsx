import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage("✅ Registration successful!");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#2c5364] via-[#203a43] to-[#0f2027]">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-[350px] text-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#00df9a]">Create Account ✨</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded-md bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#00df9a]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#00df9a]"
          />
          <button
            type="submit"
            className="bg-[#00df9a] text-black font-semibold py-2 rounded-md hover:bg-[#00c78a] transition"
          >
            Register
          </button>
          {message && <p className="text-center text-sm mt-2">{message}</p>}
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#00df9a] hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
