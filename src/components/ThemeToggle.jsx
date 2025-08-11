import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle-button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >      
      <SunIcon className="icon-size text-accent dark:text-muted" />
      <MoonIcon className="icon-size text-muted dark:text-accent" />      
    </button>
  );
};

export default ThemeToggle;
