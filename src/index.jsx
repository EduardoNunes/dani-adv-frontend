import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FontSizeProvider } from "./context/FontSizeContext";
import { ModalProvider } from "./context/ModalsContext";
import { ScrollProvider } from "./context/ScrollContext";
import { ThemeProvider } from "./context/ThemeContext";
import { TipoCadastroProvider } from "./context/TipoCadastroContext";
import MainRoutes from "./routes";
import { ShowPasswordProvider } from "./context/showPasswordContext";
import { ValidationsProvider } from "./context/ValidationsContext";

const root = ReactDOM.createRoot(document.getElementById(`root`));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <FontSizeProvider>
        <ScrollProvider>
          <ValidationsProvider>
          <TipoCadastroProvider>
            <BrowserRouter>
              <ShowPasswordProvider>
                <ModalProvider>
                  <MainRoutes />
                </ModalProvider>
              </ShowPasswordProvider>
            </BrowserRouter>
          </TipoCadastroProvider>
          </ValidationsProvider>
        </ScrollProvider>
      </FontSizeProvider>
    </ThemeProvider>
  </React.StrictMode>
);
