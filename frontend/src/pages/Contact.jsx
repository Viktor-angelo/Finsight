import './Contact.css'
import { Link } from "react-router-dom";
function Contact (){

    return (
      <div className="contact-container">
        <div className="contact">
          <Link className="back"to="/home">Back</Link>
          <h1 id="contact">CONTACT</h1>

          <p className='newIntroduction'> 
            If you’d like to get in touch, feel free to reach out anytime. I’m
            always open to conversations, whether it’s about a project, an idea,
            or just connecting. You can contact me by email, and I’ll do my best
            to respond as soon as possible. <br /> <br /> You can also find me
            on LinkedIn to learn more about my journey and connect with me
            professionally. It’s a great place to share ideas and explore new
            opportunities. <br /> <br /> If you’re interested in my work, check
            out my GitHub. I enjoy building projects and constantly improving my
            skills. Feel free to reach out — I’d be glad to hear from you.
          </p>
      <div className='urls'>
          <p className="paragraph">Adress</p>
          <p className="paragraph2">https://Sobre-mim.com.br</p>
          <p className="paragraph">Email</p>
          <p className="paragraph2">angeloviktor885@gmail.com</p>
          </div>
        </div>

        <div className="contact-form">
          <h1 id="contact-form-h1">
            FORM
          </h1>

        <form action="https://formsubmit.co/angeloviktor885@gmail.com" method="POST">
  <input type="text" name="name" placeholder="Your name" required />
  <input type="email" name="email" placeholder="Your email" required />
  <input type="text" name="message" placeholder="Message" required />

  <button type="submit">Send Message</button>

          </form>
        </div>
      </div>
    );
}
export default Contact;