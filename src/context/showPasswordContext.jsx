import React, { createContext, useState, useContext } from "react";

const ShowPasswordContext = createContext();

export function useShowPassword() {
  return useContext(ShowPasswordContext);
}

export function ShowPasswordProvider({ children }) {
  const [showPassword, setShowPassword] = useState(false);

  function handleClickShowPassword() {
    setShowPassword(prevShowPassword => !prevShowPassword);
  }

  return (
    <ShowPasswordContext.Provider
      value={{ handleClickShowPassword, showPassword }}
    >
      {children}
    </ShowPasswordContext.Provider>
  );
}
