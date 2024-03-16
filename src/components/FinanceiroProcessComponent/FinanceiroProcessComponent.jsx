import { useEffect, useState } from "react";
import XBranco from "../../assets/x-branco.png";
import XPreto from "../../assets/x-preto.png";
import { useModal } from "../../context/ModalsContext";
import { useTheme } from "../../context/ThemeContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import "./financeiro-process-component.css";

function FinanceiroProcessComponent({ updateList }) {
  const { theme } = useTheme();
  const { handleClickOpenFinanceiroProcessComponent, dataProcessId, mode } =
    useModal();
  const [entrada, setEntrada] = useState("");
  const [data_entrada, setData_entrada] = useState("");
  const [primeira_parcela, setPrimeira_parcela] = useState("");
  const [ultimaParcela, setUltimaParcela] = useState("");
  const [quantidade_parcelas, setQuantidade_parcelas] = useState("");
  const [valor_parcelas, setValor_parcelas] = useState("");
  const [datas_parcelas, setDatas_parcelas] = useState("");
  const [parcelas_pagas, setParcelas_pagas] = useState("");
  const [newDatasParcelas, setNewDatasParcelas] = useState([]);
  const [porcentagem_final, setPorcentagem_final] = useState("");
  const [data_porcentagem_final, setData_porcentagem_final] = useState("");
  const [condenacao, setCondenacao] = useState("");
  const [resultadoPorcentagem, setResultadoPorcentagem] = useState("");
  const [total, setTotal] = useState("");
  const [isInputAbleParcelas, setIsInputAbleParcelas] = useState(false);
  const [isInputAblePorcentagem, setIsInputAblePorcentagem] = useState(false);
  const [error, setError] = useState("");
  const token = getItem("token");

  async function handleSubmit(event, dataProcessId) {
    event.preventDefault();
    console.log(newDatasParcelas);
    try {
      await api.put(
        `/editarFinanceiroProcessoEscritorio/${dataProcessId}`,
        {
          entrada,
          data_entrada,
          quantidade_parcelas,
          valor_parcelas,
          datas_parcelas: newDatasParcelas,
          parcelas_pagas,
          porcentagem_final,
          data_porcentagem_final,
          condenacao,
          resultadoPorcentagem,
          total,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const jsonString = JSON.stringify(newDatasParcelas);
      setDatas_parcelas(jsonString);
    } catch (error) {
      console.log(error);
      setError(`${error.response.data.mensagem}`);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && event.target.nodeName === "INPUT") {
      event.preventDefault();
      return;
    }
  };

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
        setResultadoPorcentagem(response.data[0].resultado_porcentagem);
        setTotal(response.data[0].total);
      } catch (error) {
        console.log(error);
        setError(`${error.response.data.mensagem}`);
      }
    }

    chargeDataFinanceiroProcess();
  }, [dataProcessId, token]);

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

  useEffect(() => {
    if (datas_parcelas) {
      const stringJSON = datas_parcelas;

      const arrayDatasString = stringJSON.replace(/[{}]/g, "").split(",");
      const arrayDatas = arrayDatasString.map((data) => data.replace(/"/g, ""));

      setPrimeira_parcela(arrayDatas[0].split(":")[0]);
      setUltimaParcela(arrayDatas[arrayDatas.length - 1].split(":")[0]);
      setNewDatasParcelas(arrayDatas);
    }
  }, [datas_parcelas]);

  const calcularParcelas = () => {
    if (quantidade_parcelas && primeira_parcela) {
      calcularDatasPagamento();
    }
  };

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
    setNewDatasParcelas(datasParcelas);
    setUltimaParcela(datasParcelas[datasParcelas.length - 1].split(":")[0]);
    setParcelas_pagas("");
  };

  const handleDataChange = (status, novoValorInput, index) => {
    setNewDatasParcelas((prevData) => {
      const newDataArray = [...prevData];
      newDataArray[index] = `${status.split(":")[0]}:${novoValorInput}`;
      console.log(newDataArray, "TESTE");
      return newDataArray;
    });
  };

  useEffect(() => {
    if (quantidade_parcelas === "0") {
      setValor_parcelas("");
      setPrimeira_parcela("");
      setNewDatasParcelas("");
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
    <div className={`financeiro-process financeiro-process-${theme}`}>
      <div className="container-process">
        <div className="chart-process">
          <img
            src={theme === "light" ? XPreto : XBranco}
            title="Sair"
            alt="Sair"
            onClick={() => handleClickOpenFinanceiroProcessComponent(false)}
          />
          {mode === "edit" ? (
            <div className="content">
              <form onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
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
                        value={data_entrada}
                        onChange={(e) => setData_entrada(e.target.value)}
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
                          onChange={(e) =>
                            setQuantidade_parcelas(e.target.value)
                          }
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
                      <div className="top">
                        <div className="primeira">
                          <label>Primeira parcela:</label>
                          <input
                            type="date"
                            value={primeira_parcela}
                            disabled={isInputAbleParcelas}
                            onChange={(e) =>
                              setPrimeira_parcela(e.target.value)
                            }
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              calcularParcelas();
                            }}
                          >
                            Calcular parcelas
                          </button>
                        </div>
                        <div className="ultima">
                          <label>Última parcela:</label>
                          <input type="date" disabled value={ultimaParcela} />
                        </div>
                      </div>
                      <div className="bot">
                        <div className="todas">
                          <label>Parcelas totais:</label>
                          <ul>
                            {newDatasParcelas &&
                              newDatasParcelas.map((data, key) => (
                                <li key={key}>
                                  <input
                                    type="text"
                                    value={data.split(":")[0]}
                                    onChange={(e) =>
                                      handleDataChange(e.target.value, key)
                                    }
                                  />
                                </li>
                              ))}
                          </ul>
                        </div>
                        <div className="pagas">
                          <label>Status das parcelas:</label>
                          <ul>
                            {newDatasParcelas &&
                              newDatasParcelas.map((status, key) => (
                                <li key={key}>
                                  <select
                                    value={status.split(":")[1]}
                                    onChange={(e) =>
                                      handleDataChange(
                                        status,
                                        e.target.value,
                                        key
                                      )
                                    }
                                  >
                                    <option value="Pendente">Pendente</option>
                                    <option value="Paga">Paga</option>
                                    <option value="Vencida">Vencida</option>
                                  </select>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="final">
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
                <span>{error}</span>
                <button>Enviar</button>
              </form>
            </div>
          ) : (
            <div className="content">
              <form>
                <h3>Financeiro:</h3>
                <div className="financeiro">
                  <div className="entrada">
                    <div className="valor">
                      <label>Valor de entrada:</label>
                      <output>{`R$ ${entrada}`}</output>
                      <label>Data da entrada:</label>
                      <output>{data_entrada}</output>
                    </div>
                  </div>
                  <div className="parcelamento">
                    <div className="container1">
                      <div className="quantidade">
                        <label>Quant. parcelas:</label>
                        <output>{quantidade_parcelas}</output>
                      </div>
                      <div className="valor">
                        <label>Valor parcelas:</label>
                        <output>{`R$ ${valor_parcelas}`}</output>
                      </div>
                    </div>
                    <div className="container2">
                      <div className="top">
                        <div className="primeira">
                          <label>Primeira parcela:</label>
                          <output>{newDatasParcelas[0]}</output>
                        </div>
                        <div className="ultima">
                          <label>Última parcela:</label>
                          <output>
                            {newDatasParcelas[newDatasParcelas.length - 1]}
                          </output>
                        </div>
                      </div>
                      <div className="bot">
                        <div className="todas">
                          <label>Parcelas totais:</label>
                          <ul>
                            {newDatasParcelas &&
                              newDatasParcelas.map((data, key) => (
                                <li key={key}>
                                  <output>{data}</output>
                                </li>
                              ))}
                          </ul>
                        </div>
                        <div className="pagas">
                          <label>Status das parcelas:</label>
                          <ul>
                            {newDatasParcelas &&
                              newDatasParcelas.map((data, key) => (
                                <li key={key}>
                                  <output>{data}</output>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="final">
                    <div className="porcentagem">
                      <div className="primeira">
                        <label>Porcentagem final:</label>
                        <output>{porcentagem_final}</output>
                      </div>
                      <div className="segunda">
                        <label>Data % final:</label>
                        <output>{data_porcentagem_final}</output>
                      </div>
                      <div className="terceira">
                        <label>Condenação:</label>
                        <output>{`R$ ${condenacao}`}</output>
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
                <span>{error}</span>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FinanceiroProcessComponent;
