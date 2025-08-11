import ThemeToggle from "./ThemeToggle";
import logo from "../assets/checkmark.svg";

const Header = () => {
  return (
    <header className="header-container">
      <div className="header-logo-container">
        <img src={logo} alt="Task Manager logo" className="header-logo" />
        <span className="header-logo-text">Task Manager</span>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
