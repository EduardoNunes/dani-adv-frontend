import { useEffect, useState } from "react";
import XBranco from "../../assets/x-branco.png";
import XPreto from "../../assets/x-preto.png";
import { useModal } from "../../context/ModalsContext";
import { useTheme } from "../../context/ThemeContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import "./financeiro-processo.css";

function FinanceiroProcessDetails() {
  const { theme } = useTheme();
  const { handleClickOpenFinanceiroProcesso, dataProcessId } = useModal();
  const [dataFinanceiroProcess, setDataFinanceiroProcess] = useState();
  const [error, setError] = useState("");
  const token = getItem("token");

  async function handleSubmit() {}

  useEffect(() => {
    async function chargeDataFinanceiroProcess() {
      try {
        const response = await api.get(
          `/editarFinanceiroProcessoEscritorio/${dataProcessId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setDataFinanceiroProcess(response.data[0]);
        console.log(response.data[0]);
      } catch (error) {
        console.log(error);
        setError(`${error.response.data.mensagem}`);
      }
    }

    chargeDataFinanceiroProcess();
  }, [dataProcessId, token]);

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
          <h3>Editar financeiro do processo.</h3>

          <form onSubmit={handleSubmit}>
            {dataFinanceiroProcess ? (
              <div>
                <label>Valor de entrada:</label>
                <input type="text" value={dataFinanceiroProcess.entrada} />
                <label>Data do valor de entrada:</label>
                <input type="date" value={dataFinanceiroProcess.data_entrada} />
                <label>Quantidade de parcelas:</label>
                <input
                  type="number"
                  value={dataFinanceiroProcess.quantidade_parcelas}
                />
                <label>Valor das parcelas:</label>
                <input
                  type="text"
                  value={dataFinanceiroProcess.valor_parcelas}
                />
                <label>Data das parcelas:</label>
                <input
                  type="date"
                  value={dataFinanceiroProcess.data_parcelas}
                />
                <label>Porcentagem final:</label>
                <input
                  type="text"
                  value={dataFinanceiroProcess.porcentagem_final}
                />
                <label>Data da porcentagem final:</label>
                <input
                  type="date"
                  value={dataFinanceiroProcess.data_porcentagem_final}
                />
                <label>Valor total:</label>
                <input type="text" value={dataFinanceiroProcess.total} />
                <label>Status:</label>
                <input type="text" value={dataFinanceiroProcess.status} />

                <button>Cadastrar valores:</button>
              </div>
            ) : (
              <div>
                <label>Valor de entrada:</label>
                <input type="text" />
                <label>Data do valor de entrada:</label>
                <input type="date" />
                <label>Quantidade de parcelas:</label>
                <input type="number" />
                <label>Valor das parcelas:</label>
                <input type="text" />
                <label>Data das parcelas:</label>
                <input type="date" />
                <label>Porcentagem final:</label>
                <input type="text" />
                <label>Data da porcentagem final:</label>
                <input type="date" />
                <label>Valor total:</label>
                <input type="text" />
                <label>Status:</label>
                <input type="text" />
                {error && <span>{error}</span>}
                <button>Cadastrar valores:</button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default FinanceiroProcessDetails;
