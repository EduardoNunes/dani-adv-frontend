import IconInstagramWhite from '../../assets/instagram-branco.png';
import IconInstagramBlack from '../../assets/instagram-preto.png';
import { useTheme } from '../../context/ThemeContext';
import './styles.css';

function Instagram({ instagram }) {
    const { theme } = useTheme()    

    return (
        <div className='instagram'>
            <a href="https://www.instagram.com/danielalordelloadv/" target="_blank" rel="noopener noreferrer" alt="instagram">
                <p>{instagram}</p>
                <img src={theme === 'light' ? IconInstagramBlack : IconInstagramWhite} alt='Icone Instagram' />
            </a>
        </div>
    )
}

export default Instagram