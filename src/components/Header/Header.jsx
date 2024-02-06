import { Link, Outlet, useNavigate } from "react-router-dom";
import LogoReduzidaBranco from "../../assets/logo-reduzida-branco.png";
import LogoReduzidaColor from "../../assets/logo-reduzida-color-120px.png";
import settingsWhite from "../../assets/settings-white.png";
import settingsBlack from "../../assets/settings-black.png";
import { useFontSize } from "../../context/FontSizeContext";
import { useScroll } from "../../context/ScrollContext";
import { useTheme } from "../../context/ThemeContext";
import { removeItem, getItem } from "../../utils/storage";
import "./header.css";
import sairBranco from "../../assets/sair-branco.png";
import sairPreto from "../../assets/sair-preto.png";
import { useModal } from "../../context/ModalsContext";
import EditUser from "../../modals/EditUser/EditUser";
import Toast from "../Toast/Toast";

function Header() {
  const { handleClickOpenSettings, openUserEdit, openToast } = useModal();
  const { theme } = useTheme();
  const { scroll } = useScroll();
  const { fontSizeModify } = useFontSize();
  const navigate = useNavigate();
  let rotaDestino = "";
  let headerMove = "";
  let logoSmall = "";

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

  if (theme === "light") {
    headerMove = scroll === 0 ? "" : "header-move-light";
    logoSmall = scroll === 0 ? "" : "logo-small";
  } else {
    headerMove = scroll === 0 ? "" : "header-move-dark";
    logoSmall = scroll === 0 ? "" : "logo-small";
  }

  function handleClickLogOut() {
    removeItem("usuario");
    removeItem("token");
    removeItem("id");
    removeItem("tipo cadastro");

    navigate("/");
  }

  return (
    <div className="container-header">
      {openToast && <Toast />}
      {openUserEdit && <EditUser />}
      <div className={`header header-${theme} ${headerMove}`}>
        <div className="container">
          <div className={`logo ${logoSmall}`}>
            <Link to="/home">
              <img
                src={theme === "light" ? LogoReduzidaColor : LogoReduzidaBranco}
                alt="Logo Daniela Lordello"
              />
            </Link>
          </div>

          <nav>
            <ul
              className="menu-lista"
              style={{ fontSize: `calc(17px + ${fontSizeModify}px)` }}
            >
              <li>
                <Link to="/home">Início </Link>
              </li>
              <li>
                <Link to="/home">Sobre Drª. Daniela</Link>
              </li>
              <li>
                <Link to="/home">Missão visão e valores</Link>
              </li>
              <li>
                <Link to="/home">Contato</Link>
              </li>
            </ul>
          </nav>
          <div className="infos-client">
            <Link to={rotaDestino} className="link">
              <button
                className={`area-cliente area-cliente-${theme}`}
                style={{ fontSize: `calc(20px + ${fontSizeModify}px)` }}
              >
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
                    className="button-1"
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
                    className="button-2"
                    title="Sair"
                    onClick={() => handleClickLogOut()}
                  >
                    <img
                      src={theme === "dark" ? sairBranco : sairPreto}
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
