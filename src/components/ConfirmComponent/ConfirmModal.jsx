import { useModal } from "../../context/ModalsContext";
import "./confirm-component.css";
import Aviso from "../../assets/aviso.png";

function ConfirmComponent({ excluirProcesso, excluirCliente }) {
  const { mensagem, handleClickOpenDeleteConfirm, dataId, selectedDelete } = useModal();
  
  return (
    <div className="full-screen">
      <div className="confirm">
        <img src={Aviso} alt="Atenção!" />
        <p>{mensagem}</p>
        <div className="buttons">
          <button onClick={() => { selectedDelete === "processos" ? excluirProcesso(dataId) : excluirCliente(dataId)} }>Confirmar</button>
          <button onClick={() => handleClickOpenDeleteConfirm(false, "")}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmComponent;
