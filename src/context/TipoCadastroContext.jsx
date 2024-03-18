import { createContext, useContext, useState } from "react";

const TipoCadastroContext = createContext();

export function useTipoCadastroContext() {
  return useContext(TipoCadastroContext);
}

export function TipoCadastroProvider({ children }) {
  const [selectedOption, setSelectedOption] = useState("");
  const statusProcess = "";


  return (
    <TipoCadastroContext.Provider value={{ selectedOption, setSelectedOption, statusProcess }}>
      {children}
    </TipoCadastroContext.Provider>
  );
}
