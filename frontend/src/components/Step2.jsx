import "./steps.css";
import { DollarSign, TrendingUp, Lock, Wallet } from "lucide-react";
import { useState } from "react";

function Step2({ formData, setFormData, next }) {
  const [monthly, setMonthly] = useState("");
  const [extra, setExtra] = useState("");

  const handleNext = () => {
    setFormData({
      ...formData,
      monthly,
      extra,
    });

    next();

    setMonthly("");
    setExtra("");
  };

  return (
    <div className="container">
      <div className="containerElements">
        <h1>Welcome</h1>
        <p>
          Now, let’s understand your financial flow by adding your monthly
          income and any extra earnings.
        </p>

        <div className="inputWrapper">
          <DollarSign className="icon" size={20} />
          <input
            className="inputs"
            type="number"
            placeholder="Monthly income"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
          />
        </div>

        <div className="inputWrapper">
          <TrendingUp className="icon" size={20} />
          <input
            className="inputs"
            type="number"
            placeholder="Extra income"
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
          />
        </div>

        <button onClick={handleNext}>Cotinue</button>

        <div className="logo">
          <img src="/logoOrvix.png" alt="descricao" />
        </div>
      </div>

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

export default Step2;
