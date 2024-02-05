import IconeLinkedinBranco from '../../assets/linkedin-branco.png'
import IconeLinkedinPreto from '../../assets/linkedin-preto.png'
import { useTheme } from '../../context/ThemeContext'
import './styles.css'

function Linkedin({ nomeLinkedin }) {
    const { theme } = useTheme()

    return (
        <div className='linkedin'>
            <a href="https://www.linkedin.com/in/daniela-lordello-2b9358138/" target="_blank" rel="noopener noreferrer" alt="linkedin" >
                <p>{nomeLinkedin}</p>
                <img src={theme === 'light' ? IconeLinkedinPreto : IconeLinkedinBranco} alt="ícone linkedin" />
            </a>
        </div>
    )
}

export default Linkedin