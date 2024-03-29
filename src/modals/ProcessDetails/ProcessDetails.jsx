import "./process-details.css";
import XBlack from "../../assets/x-preto.png";
import XWhite from "../../assets/x-branco.png";
import { useTheme } from "../../context/ThemeContext";
import { useModal } from "../../context/ModalsContext";

function ProcessDetails({ processo }) {
  const { theme } = useTheme();
  const { handleOpenProcessDetails } = useModal();
  const {
    contratante,
    autor,
    reu,
    numero,
    tipo_acao,
    vara,
    juiz,
    comarca,
    data_entrada,
    atualizado,
    status,
    infos,
  } = processo;

  function invertData(data) {
    if (data) {
      const dataFormat = data.split("-");
      const newData = `${dataFormat[2]}-${dataFormat[1]}-${dataFormat[0]}`;

      return newData;
    }
  }

  return (
    <div className={`process-details process-details-${theme}`}>
      <div className="container-process">
        <div className="chart-process">
          <img
            src={theme === "light" ? XBlack : XWhite}
            title="Sair"
            alt=""
            onClick={() => handleOpenProcessDetails(false)}
          />
          <h3>Detalhes do processo</h3>
          <ul>
            <li>Contratante:</li>
            <p>{contratante}</p>
            <li>Autor:</li>
            <p>{autor}</p>
            <li>Reu:</li>
            <p>{reu}</p>
            <li>Número do processo:</li>
            <p>{numero}</p>
            <li>Tipo da ação:</li>
            <p>{tipo_acao}</p>
            <li>Vara:</li>
            <p>{vara}</p>
            <li>Juiz:</li>
            <p>{juiz}</p>
            <li>Comarca:</li>
            <p>{comarca}</p>
            <li>Data de entrada:</li>
            <p>{invertData(data_entrada)}</p>
            <li>Atualizado em:</li>
            <p>{invertData(atualizado)}</p>
            <li>Status</li>
            <p>{status}</p>
            <li>Informações:</li>
            <p className="infos">{infos}</p>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProcessDetails;
