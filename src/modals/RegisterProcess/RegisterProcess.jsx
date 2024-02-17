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
  const token = getItem("token");

  useEffect(() => {
    clientes.forEach((cliente) => {
      if (cliente.id === parseInt(selectedClient)) {
        setContratante(cliente.nome);
        return;
      }
    });    
  }, [clientes, selectedClient])

  async function handleSubmit(event) {
    event.preventDefault();

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

      handleClickOpenRegisterProcess(false);
      handleClickOpenMessageToast(true, "Processo cadastrado com sucesso!");
      updateList();
      console.log("Processo cadastrado com sucesso!", response.data);
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
            <label>Autor:</label>
            <input
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            ></input>
            <label>Reu:</label>
            <input value={reu} onChange={(e) => setReu(e.target.value)}></input>
            <label>Número do processo:</label>
            <input
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            ></input>
            <label>Tipo de ação:</label>
            <input
              value={tipoAcao}
              onChange={(e) => setTipoAcao(e.target.value)}
            ></input>
            <label>Vara:</label>
            <input
              value={vara}
              onChange={(e) => setVara(e.target.value)}
            ></input>
            <label>Juiz:</label>
            <input
              value={juiz}
              onChange={(e) => setJuiz(e.target.value)}
            ></input>
            <label>Comarca:</label>
            <input
              value={comarca}
              onChange={(e) => setComarca(e.target.value)}
            ></input>
            <label>Data de entrada:</label>
            <input
              value={data_entrada}
              onChange={(e) => setData_Entrada(e.target.value)}
            ></input>
            <label>Atualizado em:</label>
            <input
              value={atualizado}
              onChange={(e) => setAtualizado(e.target.value)}
            ></input>
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Em dia">Em dia</option>
              <option value="Quitado">Quitado</option>
              <option value="Pendente">Pendente</option>
            </select>
            <label>Informações:</label>
            <textarea
              value={infos}
              onChange={(e) => setInfos(e.target.value)}
            ></textarea>

            <button>Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterProcess;
