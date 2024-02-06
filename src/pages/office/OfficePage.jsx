import { useEffect, useState } from "react";
import lupa from "../../assets/lupa.png";
import MarmoreRoxo from "../../assets/marmore-preto-roxo.jpg";
import MarmoreBranco from "../../assets/textura-marmore.jpg";
import { useModal } from "../../context/ModalsContext";
import { useTheme } from "../../context/ThemeContext";
import ProcessDetails from "../../modals/ProcessDetails/ProcessDetails";
import EditBlack from "../../assets/edit-black.png";
import EditWhite from "../../assets/edit-white.png";
import TrashBlack from "../../assets/trash-black.png";
import TrashWhite from "../../assets/trash-white.png";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import "./office-page.css";
import EditProcess from "../../modals/EditProcess/EditProcess";
import RegisterProcess from "../../modals/RegisterProcess/RegisterProcess";

function OfficePage() {
  const { theme } = useTheme();
  const {
    handleOpenProcessDetails,
    openProcessDetails,
    selectedProcess,
    openEditProcess,
    handleClickOpenEditProcess,
    handleClickOpenRegisterProcess,
    openRegisterProcess,
  } = useModal();
  const [dataProcess, setDataProcess] = useState();
  const [newDataProcess, setNewDataProcess] = useState();

  const token = getItem("token");

  async function clientProcess() {
    const token = getItem("token");
    try {
      const response = await api.get("/processosEscritorio", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDataProcess(response.data);
      setNewDataProcess(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    clientProcess();
  }, []);

  function setSearchAll(event) {
    const searchTerm = event.toLowerCase();

    if (dataProcess) {
      if (!searchTerm) {
        setDataProcess(newDataProcess);
      } else {
        let newDataFilter = newDataProcess.filter((data) => {
          const autor = data.autor ? data.autor.toLowerCase() : "";
          const reu = data.reu ? data.reu.toLowerCase() : "";
          const numero = data.numero ? data.numero.toLowerCase() : "";
          const vara = data.vara ? data.vara.toLowerCase() : "";
          const juiz = data.juiz ? data.juiz.toLowerCase() : "";
          const comarca = data.comarca ? data.comarca.toLowerCase() : "";
          const entrada = data.data_entrada
            ? data.data_entrada.toLowerCase()
            : "";
          const atualizado = data.atualizado
            ? data.atualizado.toLowerCase()
            : "";

          return (
            autor.includes(searchTerm) ||
            reu.includes(searchTerm) ||
            numero.includes(searchTerm) ||
            vara.includes(searchTerm) ||
            juiz.includes(searchTerm) ||
            comarca.includes(searchTerm) ||
            entrada.includes(searchTerm) ||
            atualizado.includes(searchTerm)
          );
        });
        setDataProcess(newDataFilter);
      }
    }
  }

  async function excluirProcesso(processoId) {
    try {
      await api.delete(`/deletarProcesso/${processoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Processo deletado com sucesso!");
      clientProcess();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`office-page office-page-${theme}`}>
      {openProcessDetails && <ProcessDetails processo={selectedProcess} />}
      {openEditProcess && <EditProcess updateList={clientProcess}/>}
      {openRegisterProcess && <RegisterProcess updateList={clientProcess}/>}
      <img
        className={`background background-${theme}`}
        src={theme === "light" ? MarmoreBranco : MarmoreRoxo}
        alt={`Banner-${theme}`}
      />
      <div className="container">
        <div className="tool-bar">
          <div className="content">
            <div className="button-cadastrar">
              <button onClick={() => handleClickOpenRegisterProcess(true)}>
                Cadastrar Processo
              </button>
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Buscar"
                onChange={(event) => setSearchAll(event.target.value)}
              />
              <img src={lupa} alt="lupa" />
            </div>
          </div>
        </div>

        <div className="table">
          <div className="content">
            <div className="title">
              <ul>
                <li>Autor:</li>
                <li>Réu:</li>
                <li>Nº do processo:</li>
                <li>Vara:</li>
                <li>Movimentação:</li>
                <li></li>
              </ul>
            </div>
            <div className="body">
              {dataProcess && dataProcess.length === 0 ? (
                <span>Não encontramos processos para esta conta</span>
              ) : (
                dataProcess &&
                dataProcess.map((processo, index) => (
                  <div key={index} className="line">
                    <ul>
                      <li
                        title={processo.autor}
                        onClick={() => handleOpenProcessDetails(true, processo)}
                      >
                        <p> {processo.autor}</p>{" "}
                      </li>
                      <li title={processo.reu}>
                        <p>{processo.reu}</p>
                      </li>
                      <li title={processo.numero}>
                        <p>{processo.numero}</p>
                      </li>
                      <li title={processo.vara}>
                        <p>{processo.vara}</p>
                      </li>
                      <li title={processo.atualizado}>
                        <p>{processo.atualizado}</p>
                      </li>
                      <li>
                        <img
                          src={theme === "light" ? EditBlack : EditWhite}
                          alt="Edit Icon"
                          onClick={() =>
                            handleClickOpenEditProcess(true, processo)
                          }
                        />
                        <img
                          src={theme === "light" ? TrashBlack : TrashWhite}
                          alt="Trash Icon"
                          onClick={() => excluirProcesso(processo.id)}
                        />
                      </li>
                    </ul>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfficePage;
