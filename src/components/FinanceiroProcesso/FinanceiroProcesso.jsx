import "./financeiro-processo.css";
import XPreto from "../../assets/x-preto.png";
import XBranco from "../../assets/x-branco.png";
import { useTheme } from "../../context/ThemeContext";
import { useModal } from "../../context/ModalsContext";

function FinanceiroProcessDetails() {
  const { theme } = useTheme();
  const { handleClickOpenFinanceiroProcesso } = useModal();

  async function handleSubmit() {
    
  }

  return (
    <div className={`financeiro-details financeiro-details-${theme}`}>
      <div className="container-financeiro">
        <div className="chart-financeiro">
          <img
            src={theme === "light" ? XPreto : XBranco}
            title="Sair"
            alt=""
            onClick={() => handleClickOpenFinanceiroProcesso(false)}
          />
          <h3>Detalhes financeiros do processo.</h3>
          <form onSubmit={handleSubmit}>
            <label>Valor de entrada:</label>
            <input type="number" />
            <label>Data do valor de entrada:</label>
            <input type="number" />
            <label>Quantidade de parcelas:</label>
            <input type="number" />            
            <label>Valor das parcelas:</label>
            <input type="number" />
            <label>Data das parcelas:</label>
            <input type="number" />
            <label>Porcentagem final:</label>
            <input type="number" />
            <label>Data da porcentagem final:</label>
            <input type="number" />
            <label>Valor total:</label>
            <input type="number" />
            <label>Status</label>
            <input type="number" />

            <button>Cadastrar valores:</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FinanceiroProcessDetails;

