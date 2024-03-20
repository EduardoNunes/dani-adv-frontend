import '../container-pages.css'
import './container1-pages.css'

function Container1({ name, texto1, texto2, texto3, image }) {
    return (
        <div className='geral'>
            <div className='container'>
                <div
                    className={"left"} 
                >
                    <h2>{name}</h2>
                    <p>{texto1}</p>
                    <br />
                    <p>{texto2}</p>
                    <br />
                    <p>{texto3}</p>
                </div>
                <div className={"right"}>
                    <div className={"moldura-1 moldura"}>
                        <img src={image} alt={name} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Container1