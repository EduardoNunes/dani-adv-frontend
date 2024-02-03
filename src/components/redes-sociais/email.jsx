import IconeEmailBranco from '../../assets/email-branco.png'
import IconeEmailPreto from '../../assets/email-preto.png'
import { useTheme } from '../../context/ThemeContext'
import './styles.css'

function Email({ email }) {
    const { theme } = useTheme()

    return (
        <div className='email'>
            <a href={`mailto:${email}`} alt='email'>{email}</a>
            <img src={theme === 'light' ? IconeEmailPreto : IconeEmailBranco} alt="ícone linkedin" />
        </div >
    )
}

export default Email