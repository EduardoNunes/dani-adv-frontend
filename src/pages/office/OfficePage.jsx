import { useEffect, useState } from "react";
import lupa from "../../assets/lupa.png";
import MarmoreRoxo from "../../assets/marmore-preto-roxo.jpg";
import MarmoreBranco from "../../assets/textura-marmore.jpg";
import { useModal } from "../../context/ModalsContext";
import { useTheme } from "../../context/ThemeContext";
import ProcessDetails from "../../modals/ProcessDetails/ProcessDetails";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import "./office-page.css";
import EditProcess from "../../modals/EditProcess/EditProcess";
import RegisterProcess from "../../modals/RegisterProcess/RegisterProcess";
import ConfirmComponent from "../../components/ConfirmComponent/ConfirmModal";
import RegisterClient from "../../modals/RegisterClient/RegisterClient";
import TableComponent from "../../components/TableCompnent/TableComponent";

function OfficePage() {
  const { theme } = useTheme();
  const {
    handleOpenProcessDetails,
    openProcessDetails,
    selectedProcess,
    openEditProcess,
    handleClickOpenEditProcess,
    handleClickOpenRegisterProcess,
    handleClickOpenRegisterClient,
    openRegisterClient,
    openRegisterProcess,
    handleClickOpenConfirm,
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

  /* function searchAllClients(event) {
    const searchTerm = event.toLowerCase();

    if (dataClients) {
      if (!searchTerm) {
        setDataClients(newDataClients);
      } else {
        let newDataFilter = newDataClients.filter((data) => {
          const nome = data.nome ? data.nome.toLowerCase() : "";
          const nascimento = data.nascimento
            ? data.nascimento.toLowerCase()
            : "";
          const genero = data.genero ? data.genero.toLowerCase() : "";
          const nacionalidade = data.nacionalidade
            ? data.nacionalidade.toLowerCase()
            : "";
          const celular = data.celular ? data.celular.toLowerCase() : "";
          const email = data.email ? data.email.toLowerCase() : "";
          const redes_sociais = data.data_redes_sociais
            ? data.data_redes_sociais.toLowerCase()
            : "";
          const rg = data.rg ? data.rg.toLowerCase() : "";
          const cpf = data.cpf ? data.cpf.toLowerCase() : "";
          const profissao = data.profissao ? data.profissao.toLowerCase() : "";
          const estado_civil = data.estado_civil
            ? data.estado_civil.toLowerCase()
            : "";
          const formacao_academica = data.formacao_academica
            ? data.formacao_academica.toLowerCase()
            : "";
          const cep = data.cep ? data.cep.toLowerCase() : "";
          const cidade = data.cidade ? data.cidade.toLowerCase() : "";
          const bairro = data.bairro ? data.bairro.toLowerCase() : "";
          const uf = data.uf ? data.uf.toLowerCase() : "";
          const logradouro = data.logradouro
            ? data.logradouro.toLowerCase()
            : "";
          const complemento = data.complemento
            ? data.complemento.toLowerCase()
            : "";
          const infos = data.infos ? data.infos.toLowerCase() : "";

          return (
            nome.includes(searchTerm) ||
            nascimento.includes(searchTerm) ||
            genero.includes(searchTerm) ||
            nacionalidade.includes(searchTerm) ||
            celular.includes(searchTerm) ||
            email.includes(searchTerm) ||
            redes_sociais.includes(searchTerm) ||
            rg.includes(searchTerm) ||
            cpf.includes(searchTerm) ||
            profissao.includes(searchTerm) ||
            estado_civil.includes(searchTerm) ||
            formacao_academica.includes(searchTerm) ||
            cep.includes(searchTerm) ||
            cidade.includes(searchTerm) ||
            bairro.includes(searchTerm) ||
            uf.includes(searchTerm) ||
            logradouro.includes(searchTerm) ||
            complemento.includes(searchTerm) ||
            infos.includes(searchTerm)
          );
        });
        setDataClients(newDataFilter);
      }
    }
  } */

  function handleSelectChange(event) {
    const selectedValue = event.target.value;
    setSelectOption(selectedValue);

    if (selectedValue === "processos") {
      console.log(dataProcess);
    } else {
      listAllClients();
      console.log(dataClients);
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

    handleClickOpenConfirm(false);
    handleClickOpenMessageToast(true, "Processo excluído!");
  }

  return (
    <div className={`office-page office-page-${theme}`}>
      {openProcessDetails && <ProcessDetails processo={selectedProcess} />}
      {openEditProcess && <EditProcess updateList={listAllProcess} />}
      {openRegisterProcess && <RegisterProcess updateList={listAllProcess} />}
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
          <TableComponent
            autor="Autor"
            reu="Réu"
            numProcesso="Nº do processo"
            vara="Vara"
            movimentacao="Movimentação"
            dataProcess={dataProcess}
            handleOpenProcessDetails={handleOpenProcessDetails}
            handleClickOpenEditProcess={handleClickOpenEditProcess}
            handleClickOpenConfirm={handleClickOpenConfirm}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}

export default OfficePage;
