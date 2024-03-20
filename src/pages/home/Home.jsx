import BalancePinkImg from "../../assets/balanca-rosa.jpg";
import FriendlyImg from "../../assets/companheiro.jpg";
import DaniImg from "../../assets/dani-foto1.png";
import JusticePurpleImg from "../../assets/martelo-ouro.jpg";
import IconeWhatsAppVerdeVerde from "../../assets/whats-verde.png";
import { useTheme } from "../../context/ThemeContext";
import Container1 from "../../components/Containers/Container1Pages/Container1Pages";
import Container2 from "../../components/Containers/Container2Pages/Container2Pages";
import WhatsApp from "../../components/redes-sociais/WhatsApp";
import "./home.css";

function Home() {
  const { theme } = useTheme();

  const container1 = {
    name: "Quem sou?",
    texto1:
      "Dra. Daniela Lordello, OAB/BA nº 43.331, advoga há 09 anos, possui ampla experiência nas áreas de Direito Civil, Bancário, Imobiliário, do Consumidor e do Trabalho. Com passagens por instituições financeiras renomadas como Banco Itaú e Banco Bradesco, adquiriu sólida expertise em audiências, sustentações orais, diligências administrativas e judiciais, bem como, se tornou uma profissional altamente qualificada para lidar com questões financeiras e contratuais.",
    texto2:
      "Graduada em Direito pelo Centro Universitário UniRuy - Wyden, em 2014, e com um MBA em Gestão de Pessoas e Equipes de Alta Performance pela Baiana Business School, em 2019, Dra. Daniela se destaca pela habilidade como oradora, palestrante e autora de artigos, consolidando sua reputação como profissional comprometida e experiente.",
    texto3:
      "Com compromisso inabalável, excelência e defesa incansável dos interesses de seus clientes, Dra. Daniela Lordello oferece representação jurídica de qualidade, aliando vasta experiência e formação sólida para alcançar os objetivos legais de forma estratégica e profissional.",
  };

  const container2 = {
    title: "teste",
    mission: "Missão.",
    text1:
      "Vivemos um momento de rápidas transformações, onde as demandas profissionais muitas vezes nos conduzem a uma automatização fria e impessoal, quase robótica, o nosso escritório de advocacia tem como missão primordial resgatar a humanidade. No escritório Daniela Lordello Advocacia e Consultoria, a missão é clara: trazer de volta a humanização ao campo jurídico. Acreditamos que, em um mundo em constante evolução, é essencial que cada cliente seja tratado com pessoalidade, respeito e profunda valorização. A humanização é o nosso compromisso na busca da justiça.",
    vision: "Visão.",
    text2:
      "Vislumbramos um cenário no qual a advocacia transcende as formalidades, onde nossa equipe estabelece relações de confiança com os clientes, baseadas em empatia e respeito. Enxergamos um futuro onde o escritório Daniela Lordello Advocacia e Consultoria é uma referência incontestável na promoção da humanização no acesso à justiça, demonstrando que a eficiência profissional pode coexistir harmoniosamente com a conexão humana.",
    values: "Valores.",
    textos: {
      texto1:
        "Empatia: Colocamos-nos no lugar de nossos clientes, compreendendo suas necessidades e preocupações, oferecendo apoio genuíno e solidariedade jurídica.",

      texto2:
        "Respeito: Valorizamos a pessoalidade de cada cliente, respeitando suas opiniões, culturas e crenças, promovendo um ambiente de inclusão e diversidade.",

      texto3:
        "Profissionalismo: Mantemos o mais alto padrão de excelência em nosso trabalho, assegurando que nossos clientes recebam o mais completo serviço jurídico.",

      texto4:
        "Humanização: Acreditamos que a humanização é a essência da justiça. Buscamos constantemente formas de tornar nossos serviços mais próximos e personalizados, garantindo que cada cliente se sinta valorizado e compreendido em todas as etapas do processo.",
    },
  };

  return (
    <div className={"home"}>
      <div className="whatsApp">
        <WhatsApp icone={IconeWhatsAppVerdeVerde} />
      </div>
      <div className={"banner"}>
        <img
          src={theme === "light" ? JusticePurpleImg : BalancePinkImg}
          alt={`Banner-${theme}`}
        />
        <div className={"frase"}>
          <h1>"Quem não luta pelos seus direitos não é digno deles."</h1>
          <h1>Ruy Barbosa</h1>
        </div>
      </div>
      <div id="sobre">
        <Container1 {...container1} image={DaniImg} />
      </div>
      <div id="missao">
        <Container2 {...container2} imagem={FriendlyImg} />
      </div>
    </div>
  );
}

export default Home;
