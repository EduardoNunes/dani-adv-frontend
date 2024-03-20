import IconWhatsAppWhite from "../../assets/whats-branco.png";
import IconWhatsAppBlack from "../../assets/whats-preto.png";
import { useTheme } from "../../context/ThemeContext";
import "./styles.css";

function WhatsApp({ numWhatsApp, icone }) {
  const { theme } = useTheme();

  if (!icone) {
    icone = theme === "light" ? IconWhatsAppBlack : IconWhatsAppWhite;
  }

  return (
    <div className="whats-app">
      <a
        href={`https://api.whatsapp.com/send?phone=${+5571993259187}&text=Olá, Dra. Daniela, preciso de um auxílio jurídico, vamos conversar?`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>{numWhatsApp}</p>
        <img src={icone} alt="Ícone Whats App" />
      </a>
    </div>
  );
}

export default WhatsApp;
