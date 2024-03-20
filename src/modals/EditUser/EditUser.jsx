import { useEffect, useState } from "react";
import olhoAberto from "../../assets/olho-aberto.png";
import olhoFechado from "../../assets/olho-fechado.png";
import XWhite from "../../assets/x-branco.png";
import XBlack from "../../assets/x-preto.png";
import { useModal } from "../../context/ModalsContext";
import { useTheme } from "../../context/ThemeContext";
import { useValidationsContext } from "../../context/ValidationsContext";
import { useShowPassword } from "../../context/showPasswordContext";
import api from "../../services/api";
import { getItem, setItem } from "../../utils/storage";
import "./edit-user.css";

function EditUser() {
  const {
    validationPassword,
    mensagemError,
    validationName,
    validationEmail,
    validationConfirmPassword,
  } = useValidationsContext();
  const { handleClickShowPassword, showPassword } = useShowPassword();
  const { theme } = useTheme();
  const { handleClickOpenSettings, handleClickOpenMessageToast } = useModal();
  const [userData, setUserData] = useState({});
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [error, setError] = useState("");
  const token = getItem("token");
  const id = getItem("id");

  useEffect(() => {
    const EditUserData = async () => {
      const token = getItem("token");
      const id = getItem("id");      

      try {
        const response = await api.get(`/obterCliente/${id}/${getItem("tipo cadastro")}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = response.data[0];
        if (!user) return;

        setUserData(user);
        setNome(user.nome);
        setEmail(user.email);
       
        return;
      } catch (error) {
        console.error(error);
      }
    };

    EditUserData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      let mensagemError = await validationName(nome);

      if (mensagemError) {
        setError(mensagemError);
        return;
      }

      mensagemError = await validationEmail(email);

      if (mensagemError) {
        setError(mensagemError);
        return;
      }

      mensagemError = await validationPassword(senha);

      if (mensagemError) {
        setError(mensagemError);
        return;
      }

      mensagemError = await validationConfirmPassword(senha, confirmSenha);

      if (mensagemError) {
        setError(mensagemError);
        return;
      }
      
      const response = await api.put(
        `/atualizarUsuario/${id}`,
        {
          nome,
          email,
          senha,
          tipo_cadastro: getItem("tipo cadastro"),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      handleClickOpenMessageToast(true, "Usuário atualizado com sucesso!");
      handleClickOpenSettings(false);
      setItem("usuario", response.data[0].nome)
    } catch (error) {
      console.error("Erro na solicitação:", error.message);
      setError(mensagemError);
    }
  }

  return (
    <div className={`edit-user edit-user-${theme}`}>
      <div className="container-edit-user">
        <div className="chart-edit-user">
          <img
            src={theme === "light" ? XBlack : XWhite}
            title="Sair"
            alt=""
            onClick={() => handleClickOpenSettings(false)}
          />
          <h3>Editar Usuário</h3>
          {userData && Object.keys(userData).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <label>Nome</label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              ></input>
              <label>email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <label>senha</label>
              <div className="input-senha">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite a nova senha."
                  onChange={(e) => setSenha(e.target.value)}
                ></input>
                <div className="olho-password">
                  <img
                    src={showPassword ? olhoAberto : olhoFechado}
                    alt="Mostrar senha"
                    style={{
                      width: `calc(20px)`,
                    }}
                    onClick={() => handleClickShowPassword()}
                  />
                </div>
              </div>
              <label>Confirmar senha</label>
              <div className="input-senha">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Repita a nova senha."
                  onChange={(e) => setConfirmSenha(e.target.value)}
                  value={confirmSenha}
                />
                <div className="olho-password">
                  <img
                    src={showPassword ? olhoAberto : olhoFechado}
                    alt="Mostrar senha"
                    style={{
                      width: `calc(20px)`,
                    }}
                    onClick={handleClickShowPassword}
                  />
                </div>
              </div>
              <label>Tipo de cadastro</label>
              <p>{userData.tipo_cadastro}</p>

              {error && <span>{error}</span>}

              <div className="edit-buttons">
                <button>Enviar</button>
              </div>
            </form>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default EditUser;
