import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [openProcessDetails, setOpenProcessDetails] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [openUserEdit, setOpenUserEdit] = useState(false);
  const [openEditProcess, setOpenEditProcess] = useState(false);
  const [selectedEditProcess, setSelectedEditProcess] = useState(null);
  const [openRegisterProcess, setOpenRegisterProcess] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [processoId, setProcessoId] = useState("")

  function handleOpenProcessDetails(openClose, processo) {
    setSelectedProcess(processo);
    setOpenProcessDetails(openClose);
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

  function handleClickOpenMessageToast(openClose, mensagem) {
    setOpenToast(openClose);
    setMensagem(mensagem);
    setTimeout(() => {
      setOpenToast(false);
    }, 3000);
  }

  function handleClickOpenConfirm(openClose, mensagem, processoId) {
    setOpenConfirm(openClose);
    setMensagem(mensagem);
    setProcessoId(processoId)
  }

  return (
    <ModalContext.Provider
      value={{
        handleOpenProcessDetails,
        openProcessDetails,
        selectedProcess,
        handleClickOpenSettings,
        openUserEdit,
        handleClickOpenEditProcess,
        openEditProcess,
        selectedEditProcess,
        handleClickOpenRegisterProcess,
        openRegisterProcess,
        handleClickOpenMessageToast,
        openToast,
        handleClickOpenConfirm,
        mensagem,
        
        openConfirm,
        processoId
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
