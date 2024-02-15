import { useModal } from "../../context/ModalsContext";
import "./confirm-component.css";
import Aviso from "../../assets/aviso.png";

function ConfirmComponent({ excluirProcesso }) {
  const { mensagem, handleClickOpenDeleteConfirm, processoId } = useModal();
console.log("confirm modal ID", processoId)
  return (
    <div className="full-screen">
      <div className="confirm">
        <img src={Aviso} alt="Atenção!" />
        <p>{mensagem}</p>
        <div className="buttons">
          <button onClick={() => excluirProcesso(processoId)}>Confirmar</button>
          <button onClick={() => handleClickOpenDeleteConfirm(false, "")}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmComponent;
