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
  const [status, setStatus] = useState("Pendente");
  const [infos, setInfos] = useState("");
  const [entrada, setEntrada] = useState("");
  const [data_entrada_processo, setData_entrada_processo] = useState("");
  const [primeira_parcela, setPrimeira_parcela] = useState("");
  const [ultima_parcela, setUltima_parcela] = useState("");
  const [quantidade_parcelas, setQuantidade_parcelas] = useState("");
  const [valor_parcelas, setValor_parcelas] = useState("");
  const [datas_parcelas, setDatas_parcelas] = useState("");
  const [parcelas_pagas, setParcelas_pagas] = useState("");
  const [porcentagem_final, setPorcentagem_final] = useState("");
  const [data_porcentagem_final, setData_porcentagem_final] = useState("");
  const [condenacao, setCondenacao] = useState("");
  const [resultadoPorcentagem, setResultadoPorcentagem] = useState("");
  const [total, setTotal] = useState("");
  const [isInputAbleParcelas, setIsInputAbleParcelas] = useState(false);
  const [isInputAblePorcentagem, setIsInputAblePorcentagem] = useState(false);
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
              parcelas_pagas,
              porcentagem_final,
              data_porcentagem_final,
              condenacao,
              resultadoPorcentagem,
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

    digitos = digitos.replace(/^0+/, "");

    let formatted = "";

    if (digitos.length === 0) {
      formatted = "0,00";
    } else if (digitos.length < 3) {
      formatted = `0,${digitos.padStart(2, "0")}`;
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
    } else if (input === "resultado-porcentagem") {
      setResultadoPorcentagem(formatted);
    } else if (input === "total") {
      setTotal(formatted);
    }
  }

  useEffect(() => {
    calculoValorTotal();

    function calculoValorTotal() {
      let entradaNumber = Number(entrada.replace(/\D/g, ""));
      let valor_parcelasNumber = Number(valor_parcelas.replace(/\D/g, ""));
      let condenacaoNumber = Number(condenacao.replace(/\D/g, ""));
      let porcentagem_finalNumber = Number(
        porcentagem_final.replace(/\D/g, "")
      );
      let resultadoPorcentagemNumber = 0;
      let parcelamento = 0;
      let result = 0;

      if (quantidade_parcelas && valor_parcelas) {
        parcelamento = valor_parcelasNumber * quantidade_parcelas;
      }

      if (porcentagem_final && condenacao) {
        resultadoPorcentagemNumber =
          (porcentagem_finalNumber * condenacaoNumber) / 100;
        if (resultadoPorcentagemNumber >= 1) {
          formatCoin(
            parseInt(resultadoPorcentagemNumber).toString(),
            "resultado-porcentagem"
          );
        } else {
          resultadoPorcentagemNumber = 0;
          formatCoin(
            resultadoPorcentagemNumber.toString(),
            "resultado-porcentagem"
          );
        }
      }

      if (resultadoPorcentagemNumber >= 1) {
        result =
          entradaNumber + parcelamento + parseInt(resultadoPorcentagemNumber);
      } else {
        result = entradaNumber + parcelamento;
      }

      formatCoin(result.toString(), "total");
    }
  }, [
    entrada,
    quantidade_parcelas,
    valor_parcelas,
    porcentagem_final,
    condenacao,
  ]);

  const calcularDatasPagamento = () => {
    const [ano, mes, dia] = primeira_parcela.split("-").map(Number);
    const quantidade_parcelasNumber = parseInt(quantidade_parcelas);

    const datasParcelas = [];

    for (let i = 0; i < quantidade_parcelasNumber; i++) {
      const dataParcela = new Date(ano, mes - 1 + i, dia);

      const anoParcela = String(dataParcela.getFullYear());
      const mesParcela = String(dataParcela.getMonth() + 1).padStart(2, "0");
      const diaParcela = String(dataParcela.getDate()).padStart(2, "0");

      datasParcelas.push(`${anoParcela}-${mesParcela}-${diaParcela}:Pendente`);
    }

    setIsInputAbleParcelas(false);

    const ultimaParcela = datasParcelas[datasParcelas.length - 1].split(":");
    
    setUltima_parcela(ultimaParcela[0]);
    setDatas_parcelas(datasParcelas);
    console.log(datasParcelas)
    setParcelas_pagas("");
  };

  useEffect(() => {
    if (quantidade_parcelas && primeira_parcela) {
      calcularDatasPagamento();
    }
    //DESABILITANDO ESLINT NA LINHA ABAIXO PELO PROGRAMA ESTAR SOLICITANDO DEPENDENCIA Q N SERÁ USADA AQUI
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primeira_parcela, quantidade_parcelas]);

  useEffect(() => {
    if (quantidade_parcelas === "0") {
      setValor_parcelas("");
      setPrimeira_parcela("");
      setUltima_parcela("");
      setIsInputAbleParcelas(true);
    } else {
      setIsInputAbleParcelas(false);
    }
  }, [quantidade_parcelas]);

  useEffect(() => {
    if (porcentagem_final === "0") {
      setData_porcentagem_final("");
      setCondenacao("");
      setResultadoPorcentagem("0");
      setIsInputAblePorcentagem(true);
    } else {
      setResultadoPorcentagem("0");
      setIsInputAblePorcentagem(false);
    }
  }, [porcentagem_final]);

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
                      disabled={isInputAbleParcelas}
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
                      disabled={isInputAbleParcelas}
                      value={primeira_parcela}
                      onChange={(e) => setPrimeira_parcela(e.target.value)}
                    />
                  </div>
                  <div className="ultima">
                    <label>Última parcela:</label>
                    <input
                      type="date"
                      disabled={isInputAbleParcelas}
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
                        type="number"
                        value={porcentagem_final}
                        onChange={(e) => setPorcentagem_final(e.target.value)}
                      />
                    </div>
                    <div className="segunda">
                      <label>Data % final:</label>
                      <input
                        type="date"
                        disabled={isInputAblePorcentagem}
                        value={data_porcentagem_final}
                        onChange={(e) =>
                          setData_porcentagem_final(e.target.value)
                        }
                      />
                    </div>
                    <div className="terceira">
                      <label>Condenação:</label>
                      <input
                        type="text"
                        disabled={isInputAblePorcentagem}
                        value={`R$ ${condenacao}`}
                        onChange={(e) =>
                          formatCoin(e.target.value, "valor-causa")
                        }
                      />
                    </div>
                  </div>
                  <div className="total">
                    <div className="top">
                      <label>Result. Porcent.:</label>
                      <output>{`R$ ${resultadoPorcentagem}`}</output>
                    </div>
                    <div className="end">
                      <label>Valor total:</label>
                      <output>{`R$ ${total}`}</output>
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
