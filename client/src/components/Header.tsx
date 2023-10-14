import { Link } from "react-router-dom";
import "./Header.scss";

export const Header = () => {
  return (
    <header className="row align-center" id="header">
      <Link to={"/"}>
        <h2>
          URL <span className="little">shortener</span>
        </h2>
      </Link>

      <div className="row links">
        <Link to="/">Home</Link>
        <Link to="/stats">Stats</Link>
      </div>
    </header>
  );
};
