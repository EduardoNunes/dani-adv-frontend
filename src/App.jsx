import React, { useEffect } from "react";
import Footer from "./components/Footer/Footer";
import { useTheme } from "./context/ThemeContext";
import "./global.css";
import Home from "./pages/home/Home";
import "./styles.css";

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  console.log(theme, "THEME");

  return (
    <div className={`body-geral body-geral-${theme}`}>
      <Home />
      <Footer />
    </div>
  );
}

export default App;
