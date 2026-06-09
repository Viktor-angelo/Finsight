import "./steps.css";
import { User, Mail, TrendingUp, Lock, Wallet } from "lucide-react";
import { useState } from "react";

function Step1({ formData, setFormData, next }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleNext = () => {
    setFormData({
      ...formData,
      name,
      email,
    });

    next();

    setName("");
    setEmail("");
  };

  return (
    <div className="container">
      <div className="containerElements">
        <h1 className="title">Welcome</h1>
        <p>
          Let’s start with your basic information <br /> so we can personalize
          your experience <br /> and keep your account secure.
        </p>

        <div className="inputWrapper">
          <User className="icon" size={20} />
          <input
            className="inputs"
            type="text"
            placeholder="Enter Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="inputWrapper">
          <Mail className="icon" size={20} />
          <input
            className="inputs"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button onClick={handleNext}>Continue</button>

        <div className="logo">
          <img src="/logoOrvix.png" alt="descricao" />
        </div>
      </div>

      {/* resto igual */}

      <div className="explication">
        <div className="rightStep">
          <h1>Hello, Friend</h1>

          <p className="introduction">
            Take control of your finances with smart insights <br />
            • Track your finances in real time <br />
            • Save money with smart insights <br />• Keep your data secure
            Simple. Fast. Powerful.
          </p>

          <div className="cardItem">
            <TrendingUp className="cardIcon" size={40} />
            <h4> Financial Management </h4>
            <p className="pFinance">
              Financial Management Take full control of your finances with smart
              insights and simple tools designed to help you track, manage, and
              grow your money with confidence.
            </p>
          </div>

          <div className="cardItem">
            <Wallet className="cardIcon" size={40} />
            <h4>Saving Money</h4>
            <p className="pMoney">
              Build better financial habits by monitoring your spending and
              identifying opportunities to save more every day.
            </p>
          </div>

          <div className="cardItem">
            <Lock className="cardIcon" size={40} />
            <h4>Security</h4>
            <p>
              Your data is protected with advanced security measures, ensuring
              that your personal and financial information stays safe at all
              times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step1;
