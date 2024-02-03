import { useFontSize } from '../../../context/FontSizeContext'
import { useTheme } from '../../../context/ThemeContext'
import '../container-pages.css'
import './container2-pages.css'

function Container2({
    imagem,
    title,
    mission,
    text1,
    vision,
    text2,
    values,
    textos
}) {
    const { fontSizeModify } = useFontSize()
    const { theme } = useTheme()
    const { texto1, texto2, texto3, texto4 } = textos

    const themeContainerLeft = theme === 'light' ? 'left-light' : 'left-dark';
    const themeContainerRight = theme === 'light' ? 'right-light' : 'right-dark';
    const themeContainerMoldura = theme === 'light' ? 'moldura-light' : 'moldura-dark';

    return (
        <div className='geral'>
            <div className='container'>
                <div className={`right ${themeContainerRight}`}>
                    <div className={`moldura-2 ${themeContainerMoldura}`}>
                        <img src={imagem} alt={title} />
                    </div>
                </div>
                <div
                    className={`left ${themeContainerLeft}`}
                    style={{ fontSize: `calc(16px + ${fontSizeModify}px)` }}
                >
                    <h2>{mission}</h2>
                    <p>{text1}</p>
                    <br />
                    <h2>{vision}</h2>
                    <p>{text2}</p>
                    <br />
                    <h2>{values}</h2>
                    <ul>
                        <li><p>{texto1}</p></li>
                        <li><p>{texto2}</p></li>
                        <li><p>{texto3}</p></li>
                        <li><p>{texto4}</p></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Container2