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
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
