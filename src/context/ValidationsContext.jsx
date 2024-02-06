import { createContext, useContext } from "react";

const ValidationsContext = createContext();

export function useValidationsContext() {
  return useContext(ValidationsContext);
}

export function ValidationsProvider({ children }) {
  function validationPassword(password) {
    if (!password) {
      return "O campo senha é obrigatório...";
    } else if (!/(?=.*[a-z])/.test(password)) {
      return "A senha deve ter no mínimo 1 letra minúscula...";
    } else if (!/^(?=.*[A-Z])/.test(password)) {
      return "A senha deve ter no mínimo 1 letra maiúscula...";
    } else if (!/^(?=.*\d)/.test(password)) {
      return "A senha deve ter no mínimo um número...";
    } else if (!/(?=.*[@$!%^&*()[\]_=+'{};:'<,>.?/\\])/g.test(password)) {
      return "A senha deve ter no mínimo 1 caractere especial...";
    } else if (password.length < 8) {
      return "A senha deve ter no mínimo 8 caracteres...";
    }
  }

  return (
    <ValidationsContext.Provider value={{ validationPassword }}>
      {children}
    </ValidationsContext.Provider>
  );
}
