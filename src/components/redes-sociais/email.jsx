import IconEmailWhite from '../../assets/email-branco.png'
import IconEmailblack from '../../assets/email-preto.png'
import { useTheme } from '../../context/ThemeContext'
import './styles.css'

function Email({ email }) {
    const { theme } = useTheme()

    return (
        <div className='email'>
            <a href={`mailto:${email}`} alt='email'>{email}</a>
            <img src={theme === 'light' ? IconEmailblack : IconEmailWhite} alt="ícone linkedin" />
        </div >
    )
}

export default Email