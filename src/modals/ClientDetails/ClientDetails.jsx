import "./client-details.css";
import XPreto from "../../assets/x-preto.png";
import XBranco from "../../assets/x-branco.png";
import { useTheme } from "../../context/ThemeContext";
import { useModal } from "../../context/ModalsContext";
import { useEffect } from "react";

function ClientDetails({ cliente }) {
  const { theme } = useTheme();
  const { handleOpenClientDetails } = useModal();
  const {
    nome,
    nascimento,
    genero,
    nacionalidade,
    celular,
    email,
    redes_sociais,
    rg,
    cpf,
    profissao,
    estado_civil,
    formacao_academica,
    cep,
    cidade,
    bairro,
    uf,
    logradouro,
    complemento,
    status,
    infos,
  } = cliente;

  function invertData(data) {
    if (data) {
      const dataFormat = data.split("-");
      const newData = `${dataFormat[2]}-${dataFormat[1]}-${dataFormat[0]}`;

      return newData;
    }
  }

  return (
    <div className={`client-details client-details-${theme}`}>
      <div className="container-client">
        <div className="chart-client">
          <img
            src={theme === "light" ? XPreto : XBranco}
            title="Sair"
            alt=""
            onClick={() => handleOpenClientDetails(false)}
          />
          <h3>Detalhes do cliente</h3>
          <ul>
            <div className="section1">
              <div className="container1">
                <h4>Informações pessoais:</h4>
                <div className="informacoes_pessoais">
                  <label>Nome:</label>
                  <li>{nome}</li>
                  <label>Nascimento:</label>
                  <li>{invertData(nascimento)}</li>
                  <label>Gênero:</label>
                  <li>{genero}</li>
                  <label>Nacionalabeldade:</label>
                  <li>{nacionalidade}</li>
                </div>
                <h4>Contato:</h4>
                <div className="contato">
                  <label>Celular:</label>
                  <li>{celular}</li>
                  <label>Email:</label>
                  <li>{email}</li>
                  <label>Redes sociais:</label>
                  <li>{redes_sociais}</li>
                </div>
              </div>
              <div className="container2">
                <h4>Dados pessoais:</h4>
                <div className="dados_pessoais">
                  <label>RG:</label>
                  <li>{rg}</li>
                  <label>CPF:</label>
                  <li>{cpf}</li>
                </div>
                <h4>Social:</h4>
                <div className="social">
                  <label>Profissão:</label>
                  <li>{profissao}</li>
                  <label>Estado civil:</label>
                  <li>{estado_civil}</li>
                  <label>Formação acadêmica:</label>
                  <li>{formacao_academica}</li>
                </div>
              </div>
              <div className="container3">
                <h4>Endereço:</h4>
                <div className="endereco">
                  <label>CEP:</label>
                  <li>{cep}</li>
                  <label>Cidade:</label>
                  <li>{cidade}</li>
                  <label>Bairro:</label>
                  <li>{bairro}</li>
                  <label>UF:</label>
                  <li>{uf}</li>
                  <label>Logradouro:</label>
                  <li>{logradouro}</li>
                  <label>Complemento:</label>
                  <li>{complemento}</li>
                </div>
                <div className="financeiro">
                  <h4>Financeiro:</h4>
                  <label>Status:</label>
                  <li>{status}</li>
                </div>
              </div>
            </div>
            <div className="adicionais">
              <label>Informações adicionais:</label>
              <li className="infos">{infos}</li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ClientDetails;
