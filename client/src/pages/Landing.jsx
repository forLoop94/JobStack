import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main-alternative.svg";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h2>
            Job <span>Monitoring</span> App
          </h2>
          <p>
            Jobstack is a smart job monitoring tool built to simplify your
            search. Keep everything organized with an easy interface that lets
            you record and follow your applications with ease.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="Job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};
export default Landing;
