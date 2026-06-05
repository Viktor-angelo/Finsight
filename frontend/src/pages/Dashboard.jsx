import { useEffect, useState } from "react";
import "./Finance.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [financas, setFinancas] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("history")) || [];

    const withId = stored.map((item) => ({
      ...item,
      id: item.id || Date.now().toString() + Math.random(),
    }));

    setTimeout(() => {
      setFinancas([...withId].reverse());
    }, 0);
  }, []);

  const deletarFinanca = (id) => {
    const updated = financas.filter((item) => item.id !== id);

    setFinancas(updated);
    localStorage.setItem("history", JSON.stringify(updated));

    fetch(`https://finsight-jer5.onrender.com/${id}`, {
      method: "DELETE",
    }).catch(() => {});
  };

  return (
    <div className="containerHistoric">
      <div className="contentWrapper">
        <button className="backFloating" onClick={() => navigate("/home")}>
          ←
        </button>
        <h1>History</h1>
        <p>View and manage all your financial records</p>

        {financas.length === 0 ? (
          <p>No history yet</p>
        ) : (
          <>
            <div className="navHistory">
              <span>Date</span>
              <span>Category</span>
              <span>Income</span>
              <span>Expenses</span>
              <span>Balance</span>
              <span>Actions</span>
            </div>

            {financas.map((item) => (
              <div key={item.id} className="containerFinance">
                <span>
                  {item.date ? new Date(item.date).toLocaleDateString() : "-"}
                </span>

                <span>{item.category || "-"}</span>

                <span className="income">
                  {item.income ? `+${item.income}` : "-"}
                </span>

                <span className="expense">
                  {item.expenses ? `-${item.expenses}` : "-"}
                </span>

                <span className="balance">{item.balance}</span>

                <button
                  className="deleteBtn"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete?")) {
                      deletarFinanca(item.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
