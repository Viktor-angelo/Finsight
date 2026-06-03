import { useState } from "react";
import { User, Mail, Lock, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

function Model() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("BACKEND ERROR:", data);
        alert(data.error || "Error registering");
        return;
      }

      alert("User successfully registered!");
      console.log(data);

      setFormData({ name: "", email: "", age: "", password: "" });

    } catch (error) {
      console.log(error);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="containerCentral">
      <div className="newLogo2">
        <img src="/logoOrvix.png" alt="descricao" />
        <h1>Finsight</h1>
      </div>
      <div className="Login">
        <button className="btnLogin" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
      <div className="containerModel">
        <h1>Create your Account</h1>
        <p className="subP">
          Fill in the fields below to get started and take control of your
          finances
        </p>

        <form onSubmit={handleSubmit}>
        

          <div className="inputGroup">
            <User size={20} />
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

      
          <div className="inputGroup">
            <Lock size={20} />
            <input
              type="password"
              id="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
            />
          </div>


          <div className="inputGroup">
            <Mail size={20} />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

      
          <div className="inputGroup">
            <Calendar size={20} />
            <input
              type="number"
              id="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default Model;