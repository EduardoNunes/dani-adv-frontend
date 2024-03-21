import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BalancePinkImg from "../../assets/balanca-rosa.jpg";
import JusticePurpleImg from "../../assets/martelo-ouro.jpg";
import olhoAberto from "../../assets/olho-aberto.png";
import olhoFechado from "../../assets/olho-fechado.png";
import TipoCadastro from "../../components/TipoCadastro/TipoCadastro";
import { useTheme } from "../../context/ThemeContext";
import { useTipoCadastroContext } from "../../context/TipoCadastroContext";
import { useValidationsContext } from "../../context/ValidationsContext";
import { useShowPassword } from "../../context/showPasswordContext";
import api from "../../services/api";
import { getItem, setItem } from "../../utils/storage";
import "./login.css";

function Login() {
  const { theme } = useTheme();
  const { selectedOption } = useTipoCadastroContext();
  const { handleClickShowPassword, showPassword } = useShowPassword();
  const { validationEmail, validationPassword } = useValidationsContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    try {
      let mensagemError = await validationEmail(email);

      if (mensagemError) {
        setError(mensagemError);
        return;
      }

      mensagemError = await validationPassword(password);

      if (mensagemError) {
        setError(mensagemError);
        return;
      }

      if (!selectedOption) {
        setError("Escolha um tipo de cadastro");
        return;
      }

      const response = await api.post("/login", {
        email: email,
        senha: password,
        tipoCadastro: selectedOption,
      });

      if (response.status > 204) {
        return;
      }

      setItem("token", response.data.token);
      setItem("usuario", response.data.usuario.nome);
      setItem("id", response.data.usuario.id);
      setItem("tipo cadastro", response.data.usuario.tipo_cadastro);

      if (getItem("tipo cadastro") === "cliente") {
        navigate("/client");
      } else if (getItem("tipo cadastro") === "estudante") {
        navigate("/student");
      } else if (getItem("tipo cadastro") === "escritorio") {
        navigate("/office");
      }
    } catch (error) {
      console.error("Erro na solicitação:", error.message);
      setError(error.response.data.mensagem);
    }

    setEmail("");
    setPassword("");
  }

  function handleClearForm() {
    setEmail("");
    setPassword("");
    setError("");
  }

  useEffect(() => {
    if (getItem("token")) {
      navigate("/client");
    }
  }, [navigate]);

  return (
    <div className={"login"}>
      <img
        className={"background"}
        src={theme === "light" ? JusticePurpleImg : BalancePinkImg}
        alt={`Banner-${theme}`}
      />
      <div className="formulario">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="chart">
            <label>E-mail:</label>
            <input
              type="email"
              value={email}
              placeholder="Digite seu email."
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Senha:</label>
            <div className="input2">
              <input  
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Digite sua senha."
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="olho-password">
                <img
                  src={showPassword ? olhoAberto : olhoFechado}
                  alt="Mostrar senha"
                  onClick={() => handleClickShowPassword()}
                />
              </div>
            </div>
          </div>

          <TipoCadastro titulo="Quero acessar como:" page="login" />

          {error && <span>{error}</span>}
          <div className="top">
            <button type="submit">Login</button>
            <button type="button" onClick={() => handleClearForm()}>
              Limpar
            </button>
          </div>

          <div className="bottom">
            <p>Ainda não tem cadastro?</p>
            <Link to="/register">Cadastre-se</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
