import { useEffect, useState } from "react";
import lupa from "../../assets/lupa.png";
import MarmoreRoxo from "../../assets/marmore-preto-roxo.jpg";
import MarmoreBranco from "../../assets/textura-marmore.jpg";
import ConfirmComponent from "../../components/ConfirmComponent/ConfirmModal";
import TableComponent from "../../components/TableCompnent/TableComponent";
import { useModal } from "../../context/ModalsContext";
import { useTheme } from "../../context/ThemeContext";
import EditProcess from "../../modals/EditProcess/EditProcess";
import ProcessDetails from "../../modals/ProcessDetails/ProcessDetails";
import RegisterClient from "../../modals/RegisterClient/RegisterClient";
import RegisterProcess from "../../modals/RegisterProcess/RegisterProcess";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import "./office-page.css";
import ClientDetails from "../../modals/ClientDetails/ClientDetails";

function OfficePage() {
  const { theme } = useTheme();
  const {
    handleOpenProcessDetails,
    handleOpenClientDetails,
    openProcessDetails,
    openClientDetails,
    selectedProcess,
    selectedClient,
    openEditProcess,
    handleClickOpenEditProcess,
    handleClickOpenRegisterProcess,
    handleClickOpenRegisterClient,
    openRegisterClient,
    openRegisterProcess,
    handleClickOpenDeleteConfirm,
    openConfirm,
    handleClickOpenMessageToast,
  } = useModal();
  const [dataProcess, setDataProcess] = useState();
  const [newDataProcess, setNewDataProcess] = useState();
  const [dataClients, setDataClients] = useState();
  const [newDataClients, setNewDataClients] = useState();
  const [selectedOption, setSelectOption] = useState("processos");

  const token = getItem("token");

  async function listAllProcess() {
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
    listAllProcess();
  }, []);

  async function listAllClients() {
    const token = getItem("token");
    try {
      const response = await api.get("/listarClientes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDataClients(response.data);
      setNewDataClients(response.data);
      console.log(newDataClients);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSelectChange(event) {
    const selectedValue = event.target.value;
    setSelectOption(selectedValue);

    if (selectedValue === "processos") {
      listAllProcess();
    } else {
      listAllClients();
    }
  }

  function searchAllProcess(event) {
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
      listAllProcess();
    } catch (error) {
      console.error(error);
    }

    handleClickOpenDeleteConfirm(false);
    handleClickOpenMessageToast(true, "Processo excluído!");
  }

  return (
    <div className={`office-page office-page-${theme}`}>
      {openProcessDetails && <ProcessDetails processo={selectedProcess} />}
      {openEditProcess && <EditProcess updateList={listAllProcess} />}
      {openRegisterProcess && <RegisterProcess updateList={listAllProcess} />}
      {openClientDetails && <ClientDetails cliente={selectedClient} />}
      {openRegisterClient && <RegisterClient />}
      {openConfirm && <ConfirmComponent excluirProcesso={excluirProcesso} />}
      <img
        className={`background background-${theme}`}
        src={theme === "light" ? MarmoreBranco : MarmoreRoxo}
        alt={`Banner-${theme}`}
      />
      <div className="container">
        <div className="tool-bar">
          <div className="content">
            <select
              className="select"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="processos">Processos</option>
              <option value="clientes">Clientes</option>
            </select>
            <div className="button-cadastrar">
              <button onClick={() => handleClickOpenRegisterProcess(true)}>
                Cadastrar Processo
              </button>
            </div>
            <div className="button-cadastrar">
              <button onClick={() => handleClickOpenRegisterClient(true)}>
                Cadastrar Cliente
              </button>
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Buscar"
                onChange={(event) => searchAllProcess(event.target.value)}
              />
              <img src={lupa} alt="lupa" />
            </div>
          </div>
        </div>
        <div className="table">
          {selectedOption === "processos" ? (
            <TableComponent
              selectedOption={selectedOption}
              titulo1="Autor"
              titulo2="Réu"
              titulo3="Nº do processo"
              titulo4="Vara"
              titulo5="Movimentação"
              datas={dataProcess}
              handleOpenDetails={handleOpenProcessDetails}
              handleClickOpenEdit={handleClickOpenEditProcess}
              handleClickOpenDeleteConfirm={handleClickOpenDeleteConfirm}
              theme={theme}
            />
          ) : (
            <TableComponent
              selectedOption={selectedOption}
              titulo1="Nome"
              titulo2="Email"
              titulo3="Celular"
              titulo4="CPF"
              titulo5="Status"
              datas={dataClients}
              handleOpenDetails={handleOpenClientDetails}
              handleClickOpenEdit="teste2" /* {handleClickOpenEditClient} */
              handleClickOpenDeleteConfirm={handleClickOpenDeleteConfirm}
              theme={theme}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default OfficePage;
