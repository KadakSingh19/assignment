import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/auth`;

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [profile, setProfile] = useState(user);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.email) return;

      try {
        const response = await fetch(`${API_URL}/profile/${encodeURIComponent(user.email)}`);
        const data = await response.json();

        if (response.ok && data.user) {
          setProfile(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          setMessage(data.message || "Could not load profile from database");
        }
      } catch (error) {
        setMessage("Backend not reachable. Start backend server first.");
      }
    };

    loadProfile();
  }, [user?.email]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Home</h2>
        <p>Welcome, {profile.name || "User"}</p>
        <p><strong>Name:</strong> {profile.name || "-"}</p>
        <p><strong>Email:</strong> {profile.email || "-"}</p>
        <p><strong>User ID:</strong> {profile.id || "-"}</p>
        <p><strong>Password:</strong> Hidden for security</p>
        {profile.createdAt && <p><strong>Created:</strong> {new Date(profile.createdAt).toLocaleString()}</p>}
        {message && <p className="message">{message}</p>}
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
