import "./process-details.css";
import XPreto from "../../assets/x-preto.png";
import XBranco from "../../assets/x-branco.png";
import { useTheme } from "../../context/ThemeContext";
import { useModal } from "../../context/ModalsContext";

function ProcessDetails({ processo }) {
  const { theme } = useTheme();
  const { handleOpenProcessDetails } = useModal();
  const {
    autor,
    reu,
    numero,
    vara,
    juiz,
    comarca,
    data_entrada,
    atualizado,
    status,
    infos,
  } = processo;

  return (
    <div className={`process-details process-details-${theme}`}>
      <div className="container-process">
        <div className="chart-process">
          <img
            src={theme === "light" ? XPreto : XBranco}
            title="Sair"
            alt=""
            onClick={() => handleOpenProcessDetails(false)}
          />
          <h3>Detalhes do processo</h3>
          <ul>
            <li>Autor:</li>
            <p>{autor}</p>
            <li>Reu:</li>
            <p>{reu}</p>
            <li>Número do processo:</li>
            <p>{numero}</p>
            <li>Vara:</li>
            <p>{vara}</p>
            <li>Juiz:</li>
            <p>{juiz}</p>
            <li>Comarca:</li>
            <p>{comarca}</p>
            <li>Data de entrada:</li>
            <p>{data_entrada}</p>
            <li>Atualizado em:</li>
            <p>{atualizado}</p>
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
