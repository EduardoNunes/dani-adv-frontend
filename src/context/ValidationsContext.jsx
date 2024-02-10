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

  function validationEmail(email) {
    if (!email) {
      return "O campo e-mail é obrigatório";
    } else if (email.indexOf("@") === -1) {
      return "Email inválido.";
    } else if (email.indexOf(".") === -1) {
      return "Email inválido";
    }
  }

  function validationName(name) {
    if (!name) {
      return "O campo nome é obrigatório";
    } else if (name.length < 5) {
      return "Nome inválido.";
    } else if (!/\s/.test(name)) {
      return "Digite seu nome completo.";
    }
  }

  function validationConfirmPassword(senha, confirmSenha) {
    if (senha !== confirmSenha) {
      return "Os campos 'Senha' e 'Confirmar senha' não coincidem.";
    }
  }

  function validationBirth(birth) {
    const year = parseInt(birth.substring(0, 4));
    const currentYear = new Date().getFullYear();
    if (birth.length > 0 && birth.length < 8) {
      return "A data de nascimento está incompleta";
    } else if (year < 1800 || year > currentYear) {
      return "Ano de nascimento inválido";
    }
    console.log(birth);
  }

  function validationPhone(phone) {
    if (!phone) {
      return "O campo celular deve ser preenchido";
    } else if (phone.length < 9) {
      return "Número de telefone incompleto";
    }
  }

  return (
    <ValidationsContext.Provider
      value={{
        validationPassword,
        validationEmail,
        validationName,
        validationConfirmPassword,
        validationBirth,
        validationPhone,
      }}
    >
      {children}
    </ValidationsContext.Provider>
  );
}
