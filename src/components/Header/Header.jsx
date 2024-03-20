import { Link, Outlet, useNavigate } from "react-router-dom";
import LogoReductWhite from "../../assets/logo-reduzida-branco.png";
import LogoReductColorful from "../../assets/logo-reduzida-color-120px.png";
import exitWhite from "../../assets/sair-branco.png";
import exitBlack from "../../assets/sair-preto.png";
import settingsBlack from "../../assets/settings-black.png";
import settingsWhite from "../../assets/settings-white.png";
import { useModal } from "../../context/ModalsContext";
import { useScroll } from "../../context/ScrollContext";
import { useTheme } from "../../context/ThemeContext";
import EditUser from "../../modals/EditUser/EditUser";
import { getItem, removeItem } from "../../utils/storage";
import Toast from "../Toast/Toast";
import "./header.css";

function Header() {
  const { handleClickOpenSettings, openUserEdit, openToast } = useModal();
  const { theme } = useTheme();
  const { scroll } = useScroll();
  const navigate = useNavigate();
  let rotaDestino = "";

  if (getItem("tipo cadastro")) {
    if (getItem("tipo cadastro") === "cliente") {
      rotaDestino = "/client";
    } else if (getItem("tipo cadastro") === "estudante") {
      rotaDestino = "/student";
    } else if (getItem("tipo cadastro") === "escritorio") {
      rotaDestino = "/office";
    }
  } else {
    rotaDestino = "/login";
  }

  const headerMove = scroll === 0 ? "" : "header-move";
  const logoSmall = scroll === 0 ? "" : "logo-small";

  function handleClickLogOut() {
    removeItem("usuario");
    removeItem("token");
    removeItem("id");
    removeItem("tipo cadastro");

    navigate("/");
  }

  return (
    <div className="container-header" id="inicio">
      {openToast && <Toast />}
      {openUserEdit && <EditUser />}
      <div className={`header  ${headerMove}`}>
        <div className="container">
          <div className={`logo ${logoSmall}`}>
            <Link to="/home">
              <img
                src={theme === "light" ? LogoReductColorful : LogoReductWhite}
                alt="Logo Daniela Lordello"
              />
            </Link>
          </div>

          <nav>
            <ul className="menu-lista">
              <li>
                <Link to="/home">Início </Link>
              </li>
              <li>
                <a href="#sobre">Sobre Drª. Daniela</a>
              </li>
              <li>
                <a href="#missao">Missão visão e valores</a>
              </li>
              <li>
                <a href="#contato">Contato</a>
              </li>
            </ul>
          </nav>
          <div className="infos-client">
            <Link to={rotaDestino} className="link">
              <button className={`area-cliente`}>
                <p>
                  {getItem("id") !== null
                    ? getItem("usuario").split(" ")[0]
                    : "Conecte-se"}
                </p>
              </button>
            </Link>
            {getItem("id") !== null ? (
              <div className="buttons-settings-exit">
                {
                  <button
                    className="button"
                    title="configurações"
                    onClick={() => handleClickOpenSettings(true)}
                  >
                    <img
                      src={theme === "dark" ? settingsWhite : settingsBlack}
                      alt="settings icon"
                    />
                  </button>
                }

                {
                  <button
                    className="button"
                    title="Sair"
                    onClick={() => handleClickLogOut()}
                  >
                    <img
                      src={theme === "dark" ? exitWhite : exitBlack}
                      alt="exit icon"
                    />
                  </button>
                }
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="content-page">
        <Outlet />
      </div>
    </div>
  );
}

export default Header;
