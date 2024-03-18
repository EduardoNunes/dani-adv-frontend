import { createContext, useContext, useState } from "react";

const TipoCadastroContext = createContext();

export function useTipoCadastroContext() {
  return useContext(TipoCadastroContext);
}

export function TipoCadastroProvider({ children }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [statusProcess, setStatusProcess] = useState("");

  function defineStatusProcess(color) {
    setStatusProcess(color)
  }

  return (
    <TipoCadastroContext.Provider value={{ selectedOption, setSelectedOption, defineStatusProcess, setStatusProcess, statusProcess }}>
      {children}
    </TipoCadastroContext.Provider>
  );
}
