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

function RegisterClient() {
  const { theme } = useTheme();
  const { handleClickOpenRegisterClient, handleClickOpenMessageToast } =
    useModal();
  const {
    validationName,
    validationBirth,
    validationPhone,
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
          infos,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      handleClickOpenRegisterClient(false);
      handleClickOpenMessageToast(true, "Cliente cadastrado com sucesso!");
      console.log("Processo cadastrado com sucesso!", response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddressBlur() {
    if (cep.length === 8) {
      //setCep(cep.replaceAll(/\D/g, ""))
      console.log("cep 8", cep);
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      console.log(data);
      setCity(data.localidade);
      setNeighborhood(data.bairro);
      setUf(data.uf);
      setPublicPlace(data.logradouro);
      setComplement(data.complemento);
    }
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
                        onChange={(e) => setRg(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>CPF*:</label>
                      <input
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
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
                        onChange={(e) => setCep(e.target.value)}
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
                      <label>UF*:</label>
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
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Email*:</label>
                      <input
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
