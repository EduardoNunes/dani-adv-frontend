import LogoCompleteWhite from "../../assets/logo-completo-branco.png";
import LogoCompleteColor from "../../assets/logo-completo.png";
import { useTheme } from '../../context/ThemeContext';
import { useFontSize } from "../../context/FontSizeContext";
import Instagram from "../redes-sociais/Instagram";
import Linkedin from "../redes-sociais/Linkedin";
import WhatsApp from "../redes-sociais/WhatsApp";
import Email from "../redes-sociais/email";
import './footer.css';

function Footer() {
  const { theme } = useTheme()
  const { fontSizeModify } = useFontSize()
  
  const instagram = '@danielalordelloadv'
  const nomeLinkedin = 'Daniela Lordello'
  const numWhatsApp = '(71) 9 9325-9187'
  const email = 'danielalordelloadv@gmail.com'

  return (
    <div className={`footer footer-${theme}`} >
      <div className="footer-top">
        <div className="logo-completa">
          <img src={theme === 'light' ? LogoCompleteColor : LogoCompleteWhite} alt="Logo" />
        </div>
        <div className="center"></div>
        <div className="redes-sociais" style={{ fontSize: `calc(16px + ${fontSizeModify}px)` }}>
          <ul>
            <li>
              <WhatsApp numWhatsApp={numWhatsApp} />
            </li>
            <li>
              <Email email={email} />
            </li>
            <li>
              <Instagram instagram={instagram} />
            </li>
            <li>
              <Linkedin nomeLinkedin={nomeLinkedin} />
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bot" id="contato">
        <div className="container">
          <p style={{ fontSize: `calc(16px + ${fontSizeModify}px)` }} >© 2023 copiryght by Lakke_Dev</p>
        </div>
      </div>
    </div>
  )
}

export default Footer