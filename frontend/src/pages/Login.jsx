import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/auth`;

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      console.log("Login response data:", data);

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("User data stored in localStorage:", data.user);
      navigate("/home");
    } catch (error) {
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <form className="card" onSubmit={onSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : "Login"}
        </button>
        {message && <p className="message">{message}</p>}
        <p>
          No account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}
