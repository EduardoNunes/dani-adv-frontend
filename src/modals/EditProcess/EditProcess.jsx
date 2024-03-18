import { useState } from "react";
import XBranco from "../../assets/x-branco.png";
import XPreto from "../../assets/x-preto.png";
import { useModal } from "../../context/ModalsContext";
import { useTheme } from "../../context/ThemeContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import "./edit-process.css";

function EditProcess({ updateList }) {
  const { theme } = useTheme();
  const {
    handleClickOpenEditProcess,
    selectedEditProcess,
    handleClickOpenMessageToast,
  } = useModal();
  const [autor, setAutor] = useState(selectedEditProcess.autor);
  const [reu, setReu] = useState(selectedEditProcess.reu);
  const [numero, setNumero] = useState(selectedEditProcess.numero);
  const [tipo_acao, setTipo_acao] = useState(selectedEditProcess.tipo_acao);
  const [vara, setVara] = useState(selectedEditProcess.vara);
  const [juiz, setJuiz] = useState(selectedEditProcess.juiz);
  const [comarca, setComarca] = useState(selectedEditProcess.comarca);
  const [data_entrada, setData_Entrada] = useState(
    selectedEditProcess.data_entrada
  );
  const [atualizado, setAtualizado] = useState(selectedEditProcess.atualizado);
  const status = useState(selectedEditProcess.status);
  const [infos, setInfos] = useState(selectedEditProcess.infos);
  const token = getItem("token");
  const id = selectedEditProcess.id;

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await api.put(
        `/editarProcessoEscritorio/${id}`,
        {
          contratante: selectedEditProcess.contratante,
          autor,
          reu,
          numero,
          tipo_acao,
          vara,
          juiz,
          comarca,
          data_entrada,
          atualizado,
          status,
          infos,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleClickOpenEditProcess(false);
      updateList();
      handleClickOpenMessageToast(true, "Processo atualizado com sucesso!");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`edit-process edit-process-${theme}`}>
      <div className="container-process">
        <div className="chart-process">
          <img
            src={theme === "light" ? XPreto : XBranco}
            title="Sair"
            alt=""
            onClick={() => handleClickOpenEditProcess(false)}
          />
          <h3>Editar Processo</h3>
          <form onSubmit={handleSubmit}>
            <label>Contratante:</label>
            <p>
              <strong>{selectedEditProcess.contratante}</strong>
            </p>
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
            <label>Tipo da ação:</label>
            <input
              value={tipo_acao}
              onChange={(e) => setTipo_acao(e.target.value)}
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
            <p>{status}</p>
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

export default EditProcess;
