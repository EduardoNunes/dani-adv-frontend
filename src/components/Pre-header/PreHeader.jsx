import React from "react";
import IconeFontSizeRosa from "../../assets/font-size-rosa.png";
import IconeFontSizeRoxo from "../../assets/font-size-roxo.png";
import IconeLua from "../../assets/lua.png";
import IconeSol from "../../assets/sol.png";
import { useFontSize } from "../../context/FontSizeContext";
import { useScroll } from "../../context/ScrollContext";
import { useTheme } from "../../context/ThemeContext";
import "./pre-header.css";

function PreHeader() {
  const { theme, toggleTheme } = useTheme();
  const { fontSizeModify, incrementFontSize, decrementFontSize } =
    useFontSize();
  const { scroll } = useScroll();

  const preHeaderMove = scroll === 0 ? "" : "pre-header-hidden";

  return (
    <div className="container-pre-header">
      <div className={`pre-header pre-header-${theme} ${preHeaderMove}`}>
        <div className="container">
          <div className="icones-theme">
            <img
              src={theme === "light" ? IconeSol : IconeLua}
              onClick={toggleTheme}
              alt={theme === "light" ? "light" : "dark"}
            />
          </div>
          <div className={`icones-font-size icones-font-size-${theme}`}>
            <h5>Acessibilidade</h5>
            <img
              src={theme === "light" ? IconeFontSizeRoxo : IconeFontSizeRosa}
              alt={theme === "light" ? "light" : "dark"}
            />
            <div className={`change-font change-font-${theme}`}>
              <p onClick={decrementFontSize}>-</p>
              <p>{fontSizeModify}</p>
              <p onClick={incrementFontSize}>+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreHeader;
