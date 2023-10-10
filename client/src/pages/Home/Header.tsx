import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="row align-center" id="header">
      <h2>
        URL <span className="little">shortener</span>
      </h2>

      <div className="row links">
        <Link to="/">Home</Link>
        <Link to="/stats">Stats</Link>
      </div>
    </header>
  );
};

export default Header;
