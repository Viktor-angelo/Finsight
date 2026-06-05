import { useState, useContext } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Modal.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://finsight-jer5.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Login failed");
        return;
      }

      login(data);

      alert("Login successful!");
      navigate("/home", { replace: true });

    } catch (error) {
      console.error(error);
      alert("Error connecting to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containerCentral">
      <div className="newLogo2">
        <img src="/logoOrvix.png" alt="logo" />
        <h1>Finsight</h1>
      </div>

      <div className="Login">
        <button className="btnLogin" onClick={() => navigate("/")}>
          Create account
        </button>
      </div>

      <div className="containerModel">
        <h1>Welcome Back</h1>
        <p className="subP">Login to continue managing your finances</p>

        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <Mail size={20} />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <Lock size={20} />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Entering..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;