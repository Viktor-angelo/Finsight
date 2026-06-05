import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Wallet, Plane, CreditCard } from "lucide-react";
import Chart from "../components/Chart";
import "./App.css";

export default function Home() {
  const { user} = useContext(AuthContext); 
  const navigate = useNavigate();


  return (
    <div className="app-container">
      <div className="main-content">
        <div className="left">
          <h2>
            Your money, simplified <br />
            and under control
          </h2>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Welcome, {user?.name}</h3>

          </div>

          <form>
            <label>
              Manage your money effortlessly with a smart, intuitive platform.
              <br />
              Track your spending, organize your income, and make better
              <br />
              financial decisions every day.
            </label>

            <div className="buttons">
              <button
                id="Start"
                type="button"
                onClick={() =>
                  user ? navigate("/onboarding") : navigate("/login")
                }
              >
                Get Started
              </button>

              <button
                id="Tutorial"
                type="button"
                onClick={() => navigate("/about")}
              >
                how does it works?
              </button>
            </div>
          </form>

          <div className="metas">
            <h3>Example Goals</h3>

            <div className="cards-container">
              <div className="card">
                <Wallet size={30} />
                <h3>Emergency R$5,000</h3>
                <p>Emergency Fund</p>

                <div className="progress">
                  <div className="progress-bar" style={{ width: "60%" }}></div>
                </div>

                <span>60% complete</span>
              </div>

              <div className="card">
                <Plane size={30} />
                <h3>Save R$2,500</h3>
                <p>Vacation Trip</p>

                <div className="progress">
                  <div className="progress-bar" style={{ width: "45%" }}></div>
                </div>

                <span>45% complete</span>
              </div>

              <div className="card">
                <CreditCard size={30} />
                <h3>Pay off R$3,000</h3>
                <p>Credit Card Debt</p>

                <div className="progress">
                  <div className="progress-bar" style={{ width: "70%" }}></div>
                </div>

                <span>70% complete</span>
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <Chart />
        </div>
      </div>
    </div>
  );
}
