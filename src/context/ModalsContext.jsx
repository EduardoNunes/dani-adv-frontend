import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [openProcessDetails, setOpenProcessDetails] = useState(false);
  const [openClientDetails, setOpenClientDetails] = useState(false);
  const [selectedClient, setSelectedClient] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [openUserEdit, setOpenUserEdit] = useState(false);
  const [openEditProcess, setOpenEditProcess] = useState(false);
  const [selectedEditProcess, setSelectedEditProcess] = useState(null);
  const [openRegisterProcess, setOpenRegisterProcess] = useState(false);
  const [openRegisterClient, setOpenRegisterClient] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [dataId, setDataId] = useState("");
  const [selectedDelete, setSelectedDelete] = useState();
  const [openEditClient, setOpenEditClient] = useState(false);
  const [selectedEditClient, setSelectedEditClient] = useState();
  const [openFinanceiroProcesso, setOpenFinanceiroProcesso] = useState(false);
  const [dataProcessId, setDataProcessId] = useState("");
  const [mode, setMode] = useState("");
  const [status, setStatus] = useState("Em dia");

  function handleOpenProcessDetails(openClose, processo) {
    setSelectedProcess(processo);
    setOpenProcessDetails(openClose);
  }

  function handleOpenClientDetails(openClose, cliente) {
    setSelectedClient(cliente);
    setOpenClientDetails(openClose);
  }

  function handleClickOpenSettings(openClose) {
    setOpenUserEdit(openClose);
  }

  function handleClickOpenEditProcess(openClose, processo) {
    setSelectedEditProcess(processo);
    setOpenEditProcess(openClose);
  }

  function handleClickOpenRegisterProcess(openClose) {
    setOpenRegisterProcess(openClose);
  }

  function handleClickOpenRegisterClient(openClose) {
    setOpenRegisterClient(openClose);
  }

  function handleClickOpenEditClient(openClose, client) {
    setOpenEditClient(openClose);
    setSelectedEditClient(client);
  }

  function handleClickOpenMessageToast(openClose, mensagem) {
    setOpenToast(openClose);
    setMensagem(mensagem);
    setTimeout(() => {
      setOpenToast(false);
    }, 3000);
  }

  function handleClickOpenDeleteConfirm(
    openClose,
    mensagem,
    dataId,
    selectedOption,
    processId
  ) {
    setOpenConfirm(openClose);
    setMensagem(mensagem);
    setDataId(dataId);
    setSelectedDelete(selectedOption);
    setDataProcessId(processId);
  }

  function handleClickOpenFinanceiroProcessComponent(openClose, dataId, mode) {
    setOpenFinanceiroProcesso(openClose);
    setDataProcessId(dataId);
    setMode(mode);
  }

  return (
    <ModalContext.Provider
      value={{
        handleOpenProcessDetails,
        openProcessDetails,
        handleOpenClientDetails,
        openClientDetails,
        selectedProcess,
        selectedClient,
        handleClickOpenSettings,
        openUserEdit,
        handleClickOpenEditProcess,
        openEditProcess,
        selectedEditProcess,
        handleClickOpenEditClient,
        openEditClient,
        selectedEditClient,
        handleClickOpenRegisterClient,
        openRegisterClient,
        handleClickOpenRegisterProcess,
        openRegisterProcess,
        handleClickOpenMessageToast,
        openToast,
        handleClickOpenDeleteConfirm,
        mensagem,
        openConfirm,
        dataId,
        selectedDelete,
        handleClickOpenFinanceiroProcessComponent,
        openFinanceiroProcesso,
        dataProcessId,
        mode,
        status,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
