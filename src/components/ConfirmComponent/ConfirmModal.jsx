import { useModal } from "../../context/ModalsContext";
import "./confirm-component.css";
import Aviso from "../../assets/aviso.png";

function ConfirmComponent({ excluirProcesso }) {
  const { mensagem, handleClickOpenConfirm, processoId } = useModal();

  return (
    <div className="full-screen">
      <div className="confirm">
        <img src={Aviso} alt="Atenção!" />
        <p>{mensagem}</p>
        <div className="buttons">
          <button onClick={() => excluirProcesso(processoId)}>Confirmar</button>
          <button onClick={() => handleClickOpenConfirm(false, "")}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmComponent;
