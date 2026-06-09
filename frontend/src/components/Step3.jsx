import "./steps.css";
import { Home, Utensils, TrendingUp, Lock, Wallet } from "lucide-react";
import { useState } from "react";

function Step3({ formData, setFormData, next }) {
  const [rent, setRent] = useState("");
  const [food, setFood] = useState("");

  const handleNext = () => {
    const finalData = {
      ...formData,
      rent,
      food,
    };

    console.log(finalData);

    setFormData(finalData);

    setRent("");
    setFood("");

    next();
  };

  return (
    <div className="container">
      <div className="containerElements">
        <h1>Welcome</h1>
        <p>Next, tell us about your essential expenses like rent and food.</p>

        <div className="inputWrapper">
          <Home className="icon" size={20} />
          <input
            className="inputs"
            type="text"
            placeholder="Rent"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
          />
        </div>

        <div className="inputWrapper">
          <Utensils className="icon" size={20} />
          <input
            className="inputs"
            type="number"
            placeholder="Food"
            value={food}
            onChange={(e) => setFood(e.target.value)}
          />
        </div>

        <button onClick={handleNext}>Finish</button>

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
            <h4>Finance Control</h4>
            <p className="pFinance">
              Financial Management Take full control of your finances with smart
              insights and simple tools designed to help you track, manage, and
              grow your money with confidence.
            </p>
          </div>

          <div className="cardItem">
            <Wallet className="cardIcon" size={40} />
            <h4>Expense Control</h4>
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

export default Step3;
