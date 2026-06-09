import NewChart from "./newChart";
import { Link, useNavigate } from "react-router-dom";
import "./Sumary.css";
import { useState, useEffect } from "react";
import { Wallet, TrendingUp, TrendingDown, Shield, Scale } from "lucide-react";

function Result({ formData }) {
  const navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(false);

  const safeData = formData || {};

  const formatMoney = (value) => {
    if (isNaN(value)) return "$0.00";

    const formatted = value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    return formatted.replace("US$", "$");
  };

  const parseValue = (value) => {
    if (!value) return 0;

    let cleaned = value.toString().trim();
    cleaned = cleaned.replace(/[^\d.,-]/g, "");

    const hasComma = cleaned.includes(",");
    const hasDot = cleaned.includes(".");

    if (hasComma && hasDot) {
      cleaned = cleaned.replace(/\./g, "").replace(",", ".");
    } else if (hasComma) {
      cleaned = cleaned.replace(",", ".");
    } else if (hasDot) {
      const parts = cleaned.split(".");
      if (parts.length > 2) {
        cleaned = cleaned.replace(/\./g, "");
      } else if (parts[1]?.length === 3) {
        cleaned = cleaned.replace(".", "");
      }
    }

    const number = Number(cleaned);
    return isNaN(number) ? 0 : number;
  };

  const totalIncome = parseValue(safeData.monthly) + parseValue(safeData.extra);
  const totalExpenses = parseValue(safeData.rent) + parseValue(safeData.food);
  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? balance / totalIncome : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (totalIncome || totalExpenses) {
        setShowMessage(true);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [totalIncome, totalExpenses]);

  const saveHistory = (payload) => {
    try {
      const existing = JSON.parse(localStorage.getItem("history")) || [];
      const updated = [...existing, payload];
      localStorage.setItem("history", JSON.stringify(updated));
    } catch (err) {
      console.log("error saving history:", err);
    }
  };

  const sendData = async () => {
    const payload = {
      id: Date.now().toString(),
      ...safeData,
      monthly: parseValue(safeData.monthly),
      rent: parseValue(safeData.rent),
      food: parseValue(safeData.food),
      extra: parseValue(safeData.extra),
      income: totalIncome,
      expenses: totalExpenses,
      balance: balance,
      date: new Date().toISOString(),
      month: "2026-05",
    };

    console.log("SAVING AND BROWSING...");

    saveHistory(payload);

    try {
      const response = await fetch(
        "https://finsight-jer5.onrender.com/financas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      let data;

      try {
        data = await response.json();
      } catch {
        alert("Unexpected server response");
        return;
      }

      if (!response.ok) {
        console.log("BACKEND ERROR:", data);
        alert(data?.error || "Error saving data");
        return;
      }

      console.log("Saved successfully:", data);

      navigate("/dashboard");
    } catch (err) {
      console.log("CONNECTION ERROR:", err);
      alert("Error connecting to server");
    }
  };

  let message;

  if (savingsRate > 0.3) {
    message = (
      <p>
        Excellent! You're saving{" "}
        <span className="positive">{formatMoney(balance)}</span> (
        {(savingsRate * 100).toFixed(0)}%)
      </p>
    );
  } else if (balance >= 0) {
    message = (
      <p>
        You're doing okay, but things are a bit{" "}
        <span className="neutral">tight</span>. Remaining:{" "}
        <span className="neutral">{formatMoney(balance)}</span>
      </p>
    );
  } else {
    message = (
      <p>
        Attention! You're <span className="negative">overspending</span> by{" "}
        <span className="negative">{formatMoney(Math.abs(balance))}</span>
      </p>
    );
  }

  return (
    <div className="initialBody">
      <div className="containerResult">
        <h1>Summary</h1>
        <h2>Here’s an overview of your finances</h2>

        <div className="cardsSumary">
          <p className="newP">
            <TrendingUp className="iconU" size={60} />
            Income: <span className="positive">{formatMoney(totalIncome)}</span>
          </p>
          <p className="sub">Total income</p>
        </div>

        <div className="cardsSumary">
          <p className="newP">
            <TrendingDown className="iconU" size={60} />
            Expenses:{" "}
            <span
              className={totalExpenses <= totalIncome ? "positive" : "negative"}
            >
              {formatMoney(totalExpenses)}
            </span>
          </p>
          <p className="sub">Total expenses</p>
        </div>

        <div className="cardsSumary">
          <p className="newP">
            <Wallet className="iconU" size={60} />
            Balance:{" "}
            <span className={balance >= 0 ? "positive" : "negative"}>
              {formatMoney(balance)}
            </span>
          </p>
          <p className="sub">Your current balance</p>
        </div>

        <div className="sumaryButtons">
          <button className="save" onClick={sendData}>
            Save
          </button>

          <Link to="/home" className="exit">
            Exit
          </Link>
        </div>
      </div>

      <div className="containerRight">
        <h4>Insights for you</h4>

        <div className="Insights">
          <div className="newInsights">
            <TrendingUp color="green" size={40} />
            <div>
              <h5>Keep growing</h5>
              <p>
                You're building a strong financial future. Keep saving
                consistently and watch your money grow over time.
              </p>
            </div>
          </div>

          <div className="newInsights">
            <Shield color="red" size={40} />
            <div>
              <h5>Control expenses</h5>
              <p>
                Stay aware of where your money goes. Small adjustments in daily
                spending can make a big difference.
              </p>
            </div>
          </div>

          <div className="newInsights">
            <Scale color="blue" size={40} />
            <div>
              <h5>Stay balanced</h5>
              <p>Balance is key. Manage your income and expenses wisely.</p>
            </div>
          </div>

          <div className="newGraphic">
            <NewChart
              income={totalIncome}
              expenses={totalExpenses}
              balance={balance}
            />
          </div>
        </div>
      </div>

      {showMessage && (
        <div className="overlay" onClick={() => setShowMessage(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {message}
            <button onClick={() => setShowMessage(false)}>Got it</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Result;
