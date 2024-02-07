import { useEffect, useState } from "react";
import XBranco from "../../assets/x-branco.png";
import XPreto from "../../assets/x-preto.png";
import { useModal } from "../../context/ModalsContext";
import { useTheme } from "../../context/ThemeContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import "./register-client.css";

function RegisterClient() {
  const { theme } = useTheme();
  const { handleClickOpenRegisterClient, handleClickOpenMessageToast } =
    useModal();
  const [clients, setClients] = useState("");
  const [process, setProcess] = useState("");
  const [selectedProcess, setSelectedProcess] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const [email, setEmail] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [profession, setProfession] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [education, setEducation] = useState("");
  const [startValue, setStartValue] = useState("");
  const [numberInstallments, setNumberInstallments] = useState("");
  const [installmentsValue, setInstallmentsValue] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [finalPercent, setFinalPercent] = useState("");
  const [infos, setInfos] = useState("");
  const token = getItem("token");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post(
        `/cadastrarCliente`,
        {
          /*           autor,
          reu,
          numero,
          vara,
          juiz,
          comarca,
          data_entrada,
          atualizado,
          infos, */
          /* usuarios_id: selectedClient, */
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

  /*   useEffect(() => {
    const token = getItem("token");

    async function showProcess() {
      try {
        const response = await api.get("/listarProcessosDeUmCliente/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProcess(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    }

    showProcess();
  }, []); */

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
                    <label>Nome:</label>
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
                      <label>RG:</label>
                      <input
                        value={rg}
                        onChange={(e) => setRg(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>CPF:</label>
                      <input
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="container2">
                <div className="contato">
                  <h4>Contato:</h4>
                  <div className="contato-container">
                    <div>
                      <label>Celular:</label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <label>Endereço:</label>
                      <input
                        value={adress}
                        onChange={(e) => setAdress(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Email:</label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label>Nacionalidade:</label>
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
            <button>Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterClient;
