import { useEffect, useState } from "react";
import olhoAberto from "../../assets/olho-aberto.png";
import olhoFechado from "../../assets/olho-fechado.png";
import XBranco from "../../assets/x-branco.png";
import XPreto from "../../assets/x-preto.png";
import { useModal } from "../../context/ModalsContext";
import { useTheme } from "../../context/ThemeContext";
import { useShowPassword } from "../../context/showPasswordContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import "./edit-user.css";

function EditUser() {
  const { handleClickShowPassword, showPassword } = useShowPassword();
  const { theme } = useTheme();
  const { handleClickOpenSettings } = useModal();
  const [userData, setUserData] = useState({});
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const token = getItem("token");
  const id = getItem("id");  

  useEffect(() => {
    async function EditUserData() {
      try {
        const response = await api.get(`/obterCliente/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const user = response.data[0];
        setUserData(user);
        setNome(user.nome);
        setEmail(user.email);
      } catch (error) {
        console.error(error);
      }
    }

    EditUserData()
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.put(
        `/atualizarUsuario/${id}`,
        {
          nome,
          email,
          senha,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Usuário atualizado com sucesso!", response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`edit-user edit-user-${theme}`}>
      <div className="container-edit-user">
        <div className="chart-edit-user">
          <img
            src={theme === "light" ? XPreto : XBranco}
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
              <label>Tipo de cadastro</label>
              <p>{userData.cadastro}</p>

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
