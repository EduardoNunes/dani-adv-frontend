import { useState } from "react";
import XBranco from "../../assets/x-branco.png";
import XPreto from "../../assets/x-preto.png";
import { useModal } from "../../context/ModalsContext";
import { useTheme } from "../../context/ThemeContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import axios from "axios";
import "./register-client.css";
import { useValidationsContext } from "../../context/ValidationsContext";

function RegisterClient({ updateList }) {
  const { theme } = useTheme();
  const { handleClickOpenRegisterClient, handleClickOpenMessageToast } =
    useModal();
  const {
    validationName,
    validationBirth,
    validationPhone,
    validationEmail,
    validationRg,
    validationCpf,
    validationCep,
    validationCity,
    validationUf,
  } = useValidationsContext();
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [publicPlace, setPublicPlace] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [email, setEmail] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [profession, setProfession] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [education, setEducation] = useState("");
  const [status, setStatus] = useState("Em dia");
  const [infos, setInfos] = useState("");
  const [error, setError] = useState("");
  const token = getItem("token");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      let mensagemError = await validationName(name);

      if (mensagemError) {
        setError(mensagemError);
        return;
      }

      mensagemError = await validationBirth(birth);

      if (mensagemError) {
        setError(mensagemError);
        return;
      }

      mensagemError = await validationPhone(phone);

      if (mensagemError) {
        setError(mensagemError);
        return;
      }

      mensagemError = await validationEmail(email);

      if (mensagemError) {
        setError(mensagemError);
        return;
      }

      mensagemError = await validationRg(rg);

      if (mensagemError) {
        setError(mensagemError);
        return;
      }

      mensagemError = await validationCpf(cpf);

      if (mensagemError) {
        setError(mensagemError);
        return;
      }

      mensagemError = await validationCep(cep);

      if (mensagemError) {
        setError(mensagemError);
        return;
      }

      mensagemError = await validationCity(city);

      if (mensagemError) {
        setError(mensagemError);
        return;
      }

      mensagemError = await validationUf(uf);

      if (mensagemError) {
        setError(mensagemError);
        return;
      }

      const response = await api.post(
        `/cadastrarClienteEscritorio`,
        {
          nome: name,
          nascimento: birth,
          genero: gender,
          nacionalidade: country,
          celular: phone,
          email,
          redes_sociais: socialMedia,
          rg,
          cpf,
          profissao: profession,
          estado_civil: maritalStatus,
          formacao_academica: education,
          cep,
          cidade: city,
          bairro: neighborhood,
          uf,
          logradouro: publicPlace,
          complemento: complement,
          status: status,
          infos,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      handleClickOpenRegisterClient(false);
      updateList()
      handleClickOpenMessageToast(true, "Cliente cadastrado com sucesso!");
      console.log("Processo cadastrado com sucesso!", response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddressBlur() {
    if (cep.length === 9) {
      setCep(cep.replaceAll(/\D/g, ""));
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      formatCep(cep);
      setCity(data.localidade);
      setNeighborhood(data.bairro);
      setUf(data.uf);
      setPublicPlace(data.logradouro);
      setComplement(data.complemento);
    }
  }

  function formatPhone(phone) {
    let digitos = phone.replace(/\D/g, "");
    let formatted = "";

    if (phone.length > 16) {
      digitos = digitos.substring(0, 11);
      setError("Quantidade máxima de dígitos atingida.");
    }

    if (digitos.length > 2) {
      formatted += `(${digitos.substring(0, 2)})`;

      if (digitos.length > 6) {
        formatted += ` ${digitos.substring(2, 3)} ${digitos.substring(3, 7)}`;

        if (digitos.length > 7) {
          formatted += `-${digitos.substring(7)}`;
        }
      } else {
        formatted += ` ${digitos.substring(2)}`;
      }
    } else {
      formatted = digitos;
    }

    setPhone(formatted);
  }

  function formatRg(rg) {
    let digitos = rg.replace(/\D/g, "");
    let formatted = "";

    if (rg.length > 13) {
      digitos = digitos.substring(0, 10);
      setError("Quantidade máxima de dígitos atingida.");
    }

    if (digitos.length > 2) {
      formatted += `${digitos.substring(0, 2)}.`;

      if (digitos.length > 5) {
        formatted += `${digitos.substring(2, 5)}.${digitos.substring(5, 8)}`;

        if (digitos.length > 7) {
          formatted += `-${digitos.substring(8)}`;
        }
      } else {
        formatted += `${digitos.substring(2)}`;
      }
    } else {
      formatted = digitos;
    }
    setRg(formatted);
  }

  function formatCpf(Cpf) {
    let digitos = Cpf.replace(/\D/g, "");
    let formatted = "";

    if (Cpf.length > 14) {
      digitos = digitos.substring(0, 11);
      setError("Quantidade máxima de dígitos atingida.");
    }

    if (digitos.length > 3) {
      formatted += `${digitos.substring(0, 3)}.`;

      if (digitos.length > 6) {
        formatted += `${digitos.substring(3, 6)}.${digitos.substring(6, 9)}`;

        if (digitos.length > 9) {
          formatted += `-${digitos.substring(9)}`;
        }
      } else {
        formatted += `${digitos.substring(3)}`;
      }
    } else {
      formatted = digitos;
    }
    setCpf(formatted);
  }

  function formatCep(Cep) {
    let digitos = Cep.replace(/\D/g, "");
    let formatted = "";

    if (Cep.length > 9) {
      digitos = digitos.substring(0, 8);
      setError("Quantidade máxima de dígitos atingida.");
    }

    if (digitos.length > 5) {
      formatted += `${digitos.substring(0, 5)}-${digitos.substring(5, 8)}`;
    } else {
      formatted = digitos;
    }
    setCep(formatted);
  }

  return (
    <div className={`register-client register-client-${theme}`}>
      <div className="container-client">
        <div className="chart-client">
          <img
            src={theme === "light" ? XPreto : XBranco}
            title="Sair"
            alt="Sair"
            onClick={() => handleClickOpenRegisterClient(false)}
          />
          <h3>Cadastrar Cliente</h3>
          <form onSubmit={handleSubmit}>
            <div className="formulario">
              <div className="container1">
                <div className="pessoal">
                  <h4>Informações pessoais:</h4>
                  <div className="pessoal-container0">
                    <label>Nome*:</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="pessoal-container1">
                    <div>
                      <label>Nascimento:</label>
                      <input
                        type="date"
                        value={birth}
                        onChange={(e) => setBirth(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Gênero:</label>
                      <input
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Nacionalidade:</label>
                      <input
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="dados-pessoais">
                  <h4>Dados pessoais:</h4>
                  <div className="dados-pessoais-container">
                    <div>
                      <label>RG*:</label>
                      <input
                        value={rg}
                        onChange={(e) => formatRg(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>CPF*:</label>
                      <input
                        value={cpf}
                        onChange={(e) => formatCpf(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="address">
                  <h4>Endereço</h4>
                  <div className="container0">
                    <div className="container1">
                      <label>CEP*:</label>
                      <input
                        value={cep}
                        onChange={(e) => formatCep(e.target.value)}
                        onBlur={handleAddressBlur}
                      />
                      <label>Bairro*:</label>
                      <input
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                      />
                    </div>
                    <div className="container2">
                      <label>Cidade*:</label>
                      <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <label>Estado*:</label>
                      <input
                        value={uf}
                        onChange={(e) => setUf(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="container3">
                    <label>Logradouro*:</label>
                    <input
                      value={publicPlace}
                      onChange={(e) => setPublicPlace(e.target.value)}
                    />
                    <label>Complemento:</label>
                    <input
                      value={complement}
                      onChange={(e) => setComplement(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="container2">
                <div className="contato">
                  <h4>Contato:</h4>
                  <div className="contato-container">
                    <div>
                      <label>Celular*:</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => formatPhone(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Email*:</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label>Redes sociais:</label>
                      <input
                        value={socialMedia}
                        onChange={(e) => setSocialMedia(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="social">
                  <h4>Social:</h4>
                  <div className="social-container1">
                    <label>Profissão:</label>
                    <input
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                    />
                  </div>
                  <div className="social-container2">
                    <div>
                      <label>Estado Civil:</label>
                      <input
                        value={maritalStatus}
                        onChange={(e) => setMaritalStatus(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Formação acadêmica:</label>
                      <input
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="financeiro">
                  <h4>Financeiro:</h4>
                  <div className="financeiro-container">
                    <label>Status:</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="em-dia">Em dia</option>
                      <option value="pendente">Pendente</option>
                      <option value="quitado">Quitado</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="infos">
              <label>Informações adicionais:</label>
              <textarea
                value={infos}
                onChange={(e) => setInfos(e.target.value)}
              />
            </div>
            {error && <span>{error}</span>}
            <button>Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterClient;
