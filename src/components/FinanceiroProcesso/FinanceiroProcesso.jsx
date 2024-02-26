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
  const { handleClickOpenEditFinanceiroProcesso, dataProcessId } = useModal();
  const [entrada, setEntrada] = useState("");
  const [data_entrada, setData_entrada] = useState("");
  const [quantidade_parcelas, setQuantidade_parcelas] = useState(0);
  const [valor_parcelas, setValor_parcelas] = useState("");
  const [datas_parcelas, setDatas_parcelas] = useState("");
  const [parcelas_pagas, setParcelas_pagas] = useState("");
  const [porcentagem_final, setPorcentagem_final] = useState(0);
  const [data_porcentagem_final, setData_porcentagem_final] = useState("");
  const [condenacao, setCondenacao] = useState("");
  const [resultado_porcentagem, setResultado_porcentagem] = useState("");
  const [total, setTotal] = useState("");
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

        setEntrada(response.data[0].entrada);
        setData_entrada(response.data[0].data_entrada);
        setQuantidade_parcelas(response.data[0].quantidade_parcelas);
        setValor_parcelas(response.data[0].valor_parcelas);
        setDatas_parcelas(response.data[0].datas_parcelas);
        setParcelas_pagas(response.data[0].parcelas_pagas);
        setPorcentagem_final(response.data[0].porcentagem_final);
        setData_porcentagem_final(response.data[0].data_porcentagem_final);
        setCondenacao(response.data[0].condenacao);
        setResultado_porcentagem(response.data[0].resultado_porcentagem);
        setTotal(response.data[0].total);

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
            onClick={() => handleClickOpenEditFinanceiroProcesso(false)}
          />
          <h3>Editar financeiro do processo.</h3>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Valor de entrada:</label>
              <input
                type="text"
                value={entrada}
                onChange={(e) => setEntrada(e.target.value)}
              />
              <label>Data do valor de entrada:</label>
              <input
                type="text"
                value={data_entrada}
                onChange={(e) => setData_entrada(e.target.value)}
              />
              <label>Quantidade de parcelas:</label>
              <input
                type="number"
                value={quantidade_parcelas}
                onChange={(e) => setQuantidade_parcelas(e.target.value)}
              />
              <label>Valor das parcelas:</label>
              <input
                type="text"
                value={valor_parcelas}
                onChange={(e) => setValor_parcelas(e.target.value)}
              />
              <label>Datas das parcelas:</label>
              <input
                type="text"
                value={datas_parcelas}
                onChange={(e) => setDatas_parcelas(e.target.value)}
              />
              <label>Parcelas Pagas:</label>
              <input
                type="text"
                value={parcelas_pagas}
                onChange={(e) => setParcelas_pagas(e.target.value)}
              />
              <label>Porcentagem final:</label>
              <input
                type="number"
                value={porcentagem_final}
                onChange={(e) => setPorcentagem_final(e.target.value)}
              />
              <label>Data da porcentagem final:</label>
              <input
                type="text"
                value={data_porcentagem_final}
                onChange={(e) => setData_porcentagem_final(e.target.value)}
              />
              <label>Valor da condenação:</label>
              <input
                type="text"
                value={condenacao}
                onChange={(e) => setCondenacao(e.target.value)}
              />
              <label>Calculo da condenação:</label>
              <input
                type="text"
                value={resultado_porcentagem}
                onChange={(e) => setResultado_porcentagem(e.target.value)}
              />
              <label>Valor total:</label>
              <input
                type="text"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
              />
              <label>Status:</label>
              <input
                type="text"
                value={"STATUS"}
                onChange={(e) => setTotal(e.target.value)}
              />

              <span>{error}</span>
              <button>Cadastrar valores:</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FinanceiroProcessDetails;
