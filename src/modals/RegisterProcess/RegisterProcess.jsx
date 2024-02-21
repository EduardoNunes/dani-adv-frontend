import { useEffect, useState } from "react";
import XBranco from "../../assets/x-branco.png";
import XPreto from "../../assets/x-preto.png";
import { useModal } from "../../context/ModalsContext";
import { useTheme } from "../../context/ThemeContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import "./register-process.css";

function RegisterProcess({ updateList }) {
  const { theme } = useTheme();
  const { handleClickOpenRegisterProcess, handleClickOpenMessageToast } =
    useModal();
  const [clientes, setClientes] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [contratante, setContratante] = useState("");
  const [autor, setAutor] = useState("");
  const [reu, setReu] = useState("");
  const [numero, setNumero] = useState("");
  const [tipoAcao, setTipoAcao] = useState("");
  const [vara, setVara] = useState("");
  const [juiz, setJuiz] = useState("");
  const [comarca, setComarca] = useState("");
  const [data_entrada, setData_Entrada] = useState("");
  const [atualizado, setAtualizado] = useState("");
  const [status, setStatus] = useState("Em dia");
  const [infos, setInfos] = useState("");
  const [entrada, setEntrada] = useState("");
  const [data_entrada_processo, setData_entrada_processo] = useState("");
  const [priemira_parcela, setPrimeira_parcela] = useState("");
  const [ultima_parcela, setUltima_parcela] = useState("");
  const [quantidade_parcelas, setQuantidade_parcelas] = useState("");
  const [valor_parcelas, setValor_parcelas] = useState("");
  const [datas_parcelas, setDatas_parcelas] = useState("");
  const [porcentagem_final, setPorcentagem_final] = useState("");
  const [data_porcentagem_final, setData_porcentagem_final] = useState("");
  const [condenacao, setCondenacao] = useState("");
  const [total, setTotal] = useState("");
  const token = getItem("token");

  useEffect(() => {
    clientes.forEach((cliente) => {
      if (cliente.id === parseInt(selectedClient)) {
        setContratante(cliente.nome);
        return;
      }
    });
  }, [clientes, selectedClient]);

  async function handleSubmit(event) {
    event.preventDefault();
    let processo_id;

    try {
      const response = await api.post(
        `/cadastrarProcesso`,
        {
          contratante: contratante,
          autor,
          reu,
          numero,
          tipo_acao: tipoAcao,
          vara,
          juiz,
          comarca,
          data_entrada,
          atualizado,
          status,
          infos,
          cliente_id: selectedClient,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      processo_id = response.data.processo.id;

      if (processo_id) {
        try {
          await api.post(
            `/cadastrarFinanceiroProcesso`,
            {
              contratante: contratante,
              entrada,
              data_entrada_processo,
              quantidade_parcelas,
              valor_parcelas,
              datas_parcelas,
              porcentagem_final,
              data_porcentagem_final,
              total,
              processo_id,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } catch (error) {
          console.log(error);
        }
      }

      handleClickOpenRegisterProcess(false);
      handleClickOpenMessageToast(true, "Processo cadastrado com sucesso!");
      updateList();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const token = getItem("token");

    async function showClients() {
      try {
        const response = await api.get("/listarClientes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setClientes(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    showClients();
  }, []);

  function formatNumberProcess(numberProcess) {
    let digitos = numberProcess.replace(/\D/g, "");
    let formatted = "";

    if (digitos.length > 0) {
      formatted += digitos.substring(0, 7);

      if (digitos.length > 7) {
        formatted += `-${digitos.substring(7, 9)}`;

        if (digitos.length > 9) {
          formatted += `.${digitos.substring(9, 13)}`;

          if (digitos.length > 13) {
            formatted += `.${digitos.substring(13, 14)}`;

            if (digitos.length > 14) {
              formatted += `.${digitos.substring(14, 16)}`;

              if (digitos.length > 16) {
                formatted += `.${digitos.substring(16, 20)}`;
              }
            }
          }
        }
      }
    }
    setNumero(formatted);
  }

  function formatCoin(moeda, input) {
    let digitos = moeda.replace(/\D/g, "");
    let formatted = "";

    if (digitos.length < 3) {
      const centavos = digitos.substring(digitos.length - 2);
      formatted = `${centavos}`;
    } else if (digitos.length < 6) {
      const centavos = digitos.substring(digitos.length - 2);
      const centena = digitos.substring(digitos.length - 2, digitos.length - 5);
      formatted = `${centena},${centavos}`;
    } else if (digitos.length < 9) {
      const centavos = digitos.substring(digitos.length - 2);
      const centena = digitos.substring(digitos.length - 2, digitos.length - 5);
      const milhar = digitos.substring(digitos.length - 5, digitos.length - 8);
      formatted = `${milhar}.${centena},${centavos}`;
    } else if (digitos.length < 12) {
      const centavos = digitos.substring(digitos.length - 2);
      const centena = digitos.substring(digitos.length - 2, digitos.length - 5);
      const milhar = digitos.substring(digitos.length - 5, digitos.length - 8);
      const milhao = digitos.substring(digitos.length - 8, digitos.length - 11);
      formatted = `${milhao}.${milhar}.${centena},${centavos}`;
    } else if (digitos.length < 15) {
      const centavos = digitos.substring(digitos.length - 2);
      const centena = digitos.substring(digitos.length - 2, digitos.length - 5);
      const milhar = digitos.substring(digitos.length - 5, digitos.length - 8);
      const milhao = digitos.substring(digitos.length - 8, digitos.length - 11);
      const bilhao = digitos.substring(
        digitos.length - 11,
        digitos.length - 14
      );
      formatted = `${bilhao}.${milhao}.${milhar}.${centena},${centavos}`;
    } else return;

    if (input === "entrada") {
      setEntrada(formatted);
    } else if (input === "valor-parcelas") {
      setValor_parcelas(formatted);
    } else if (input === "valor-causa") {
      setCondenacao(formatted);
    }
  }

  function porcentagemFinal(params) {
    let digitos = params.replace(/\D/g, "");

    setPorcentagem_final(digitos);
  }

  return (
    <div className={`register-process register-process-${theme}`}>
      <div className="container-process">
        <div className="chart-process">
          <img
            src={theme === "light" ? XPreto : XBranco}
            title="Sair"
            alt="Sair"
            onClick={() => handleClickOpenRegisterProcess(false)}
          />
          <h3>Cadastrar Processo</h3>
          <form onSubmit={handleSubmit}>
            <div className="container1">
              <div className="section1">
                <div className="contratante">
                  <label>Contratante:</label>
                  <select
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                  >
                    <option value="">Selecione um cliente</option>
                    {clientes &&
                      clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente.nome}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="partes">
                  <label>Autor:</label>
                  <input
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                  />
                  <label>Reu:</label>
                  <input value={reu} onChange={(e) => setReu(e.target.value)} />
                </div>
                <div className="processo">
                  <div>
                    <label>Número do processo:</label>
                    <input
                      type="text"
                      value={numero}
                      onChange={(e) => formatNumberProcess(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Tipo de ação:</label>
                    <input
                      value={tipoAcao}
                      onChange={(e) => setTipoAcao(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="section2">
                <div className="localidade">
                  <label>Vara:</label>
                  <input
                    value={vara}
                    onChange={(e) => setVara(e.target.value)}
                  />
                  <label>Juiz:</label>
                  <input
                    value={juiz}
                    onChange={(e) => setJuiz(e.target.value)}
                  />
                  <label>Comarca:</label>
                  <input
                    value={comarca}
                    onChange={(e) => setComarca(e.target.value)}
                  />
                </div>
                <div className="data">
                  <div>
                    <label>Data de entrada:</label>
                    <input
                      type="date"
                      value={data_entrada}
                      onChange={(e) => setData_Entrada(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Atualizado em:</label>
                    <input
                      type="date"
                      value={atualizado}
                      onChange={(e) => setAtualizado(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <h3>Financeiro:</h3>
            <div className="financeiro">
              <div className="entrada">
                <div className="valor">
                  <label>Valor de entrada:</label>
                  <input
                    type="text"
                    value={`R$ ${entrada}`}
                    onChange={(e) => formatCoin(e.target.value, "entrada")}
                  />
                  <label>Data da entrada:</label>
                  <input
                    type="date"
                    value={data_entrada_processo}
                    onChange={(e) => setData_entrada_processo(e.target.value)}
                  />
                </div>
              </div>

              <div className="parcelamento">
                <div className="container1">
                  <div className="quantidade">
                    <label>Quant. parcelas:</label>
                    <input
                      type="number"
                      value={quantidade_parcelas}
                      onChange={(e) => setQuantidade_parcelas(e.target.value)}
                    />
                  </div>
                  <div className="valor">
                    <label>Valor parcelas:</label>
                    <input
                      type="text"
                      value={`R$ ${valor_parcelas}`}
                      onChange={(e) =>
                        formatCoin(e.target.value, "valor-parcelas")
                      }
                    />
                  </div>
                </div>
                <div className="container2">
                  <div className="primeira">
                    <label>Primeira parcela:</label>
                    <input
                      type="date"
                      value={priemira_parcela}
                      onChange={(e) => setPrimeira_parcela(e.target.value)}
                    />
                  </div>
                  <div className="ultima">
                    <label>Última parcela:</label>
                    <input
                      type="date"
                      value={ultima_parcela}
                      onChange={(e) => setUltima_parcela(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="final">
                <div className="container0">
                  <div className="porcentagem">
                    <div className="primeira">
                      <label>Porcentagem final:</label>
                      <input
                        type="text"
                        value={`${porcentagem_final}%`}
                        onChange={(e) => porcentagemFinal(e.target.value)}
                      />
                    </div>
                    <div className="segunda">
                      <label>Data % final:</label>
                      <input
                        type="date"
                        value={data_porcentagem_final}
                        onChange={(e) => setData_porcentagem_final(e.target.value)}
                      />
                    </div>
                    <div className="terceira">
                      <label>Condenação:</label>
                      <input
                        type="text"
                        value={`R$ ${condenacao}`}
                        onChange={(e) =>
                          formatCoin(e.target.value, "valor-causa")
                        }
                      />
                    </div>
                  </div>
                  <div className="total">
                    <div className="end">
                      <label>Valor total:</label>
                      <input
                        type="text"
                        value={`R$ ${total}`}
                        onChange={(e) => setTotal(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="infos">
              <label>Informações gerais:</label>
              <textarea
                value={infos}
                onChange={(e) => setInfos(e.target.value)}
              ></textarea>
            </div>
            <button>Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterProcess;
