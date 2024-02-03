import { useFontSize } from '../../../context/FontSizeContext'
import { useTheme } from '../../../context/ThemeContext'
import '../container-pages.css'
import './container1-pages.css'

function Container1({ name, texto1, texto2, texto3, image }) {
    const { fontSizeModify } = useFontSize()
    const { theme } = useTheme()

    const themeContainerLeft = theme === 'light' ? 'left-light' : 'left-dark';
    const themeContainerRight = theme === 'light' ? 'right-light' : 'right-dark';
    const themeContainerMoldura = theme === 'light' ? 'moldura-light' : 'moldura-dark';

    return (
        <div className='geral'>
            <div className='container'>
                <div
                    className={`left ${themeContainerLeft}`} 
                    style={{ fontSize: `calc(16px + ${fontSizeModify}px)` }}
                >
                    <h2>{name}</h2>
                    <p>{texto1}</p>
                    <br />
                    <p>{texto2}</p>
                    <br />
                    <p>{texto3}</p>
                </div>
                <div className={`right ${themeContainerRight}`}>
                    <div className={`moldura-1 ${themeContainerMoldura}`}>
                        <img src={image} alt={name} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Container1