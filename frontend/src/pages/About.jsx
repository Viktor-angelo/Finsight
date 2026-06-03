import { Link } from "react-router-dom";
import './About.css'
import { ArrowLeft, Home, Square  } from "lucide-react";


function About(){
    
    return (
      <section className="hero">
        <div className="hero-content">
          <div className="phone-container">
            <div className="phone">
              <div className="screen">
                <h4>Your Goals</h4>

                <div className="goal">
                  <span>Trip to Japan</span>
                  <small> $1,800 / $3,00</small>
                  <div className="progress">
                    <div className="progress-bar w-40 green"></div>
                    <span>40% complete</span>
                  </div>
                </div>
                <div className="goal">
                  <span>Credit Card</span>
                  <small>$2,100 / $3,00</small>
                  <div className="progress">
                    <div className="progress-bar w-70 purple"></div>
                    <span>70% complete</span>
                  </div>
                </div>
                <div className="goal">
                  <span>Emergency Fund</span>
                  <small>$3,00 / $5,00</small>
                  <div className="progress">
                    <div className="progress-bar w-60"></div>
                    <span>60% complete</span>
                    <button className="button-screen">Ok</button>
                    <footer className="navbar">
                      {" "}
                      <ArrowLeft className="arrowleft" size={20} />{" "}
                      <Home className="home" size={20} />{" "}
                      <Square className="square" size={20} />{" "}
                    </footer>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-text">
            <h1>FinSight</h1>
            <p>
              This project was created to make financial tracking simple,
              intuitive, and visually engaging. It reflects my ability to build
              clean and functional interfaces focused on usability, helping
              users clearly manage income, expenses, and balance.
              <br />
              <br />
              During development, I strengthened my front-end fundamentals,
              especially using Flexbox to create scalable and maintainable
              layouts, moving away from manual positioning toward more
              professional structures.
              <br />
              <br />
              More than the final result, this project represents my growth as a
              developer — focused on continuous learning, attention to detail,
              and building user experiences inspired by real-world applications.
            </p>
            <Link to="/home" className="btn-primary">
              Next
            </Link>
          </div>
        </div>
      </section>
    );
}

export default About