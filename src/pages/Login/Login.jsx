import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BalancaRosaFoto from "../../assets/balanca-rosa.jpg";
import JusticaRoxoFoto from "../../assets/martelo-ouro.jpg";
import olhoAberto from "../../assets/olho-aberto.png";
import olhoFechado from "../../assets/olho-fechado.png";
import { useFontSize } from "../../context/FontSizeContext";
import { useTheme } from "../../context/ThemeContext";
import api from "../../services/api";
import TipoCadastro from "../../components/TipoCadastro/TipoCadastro";
import "./login.css";
import { useTipoCadastroContext } from "../../context/TipoCadastroContext";
import { getItem, setItem } from "../../utils/storage";
import { useShowPassword } from "../../context/showPasswordContext";

function Login() {
  const { theme } = useTheme();
  const { selectedOption } = useTipoCadastroContext();
  const { fontSizeModify } = useFontSize();
  const { handleClickShowPassword, showPassword } =
    useShowPassword();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    try {
      if (!email) {
        setError("O campo e-mail está vazio");
        return;
      } else if (!password) {
        setError("O campo senha está vazio");
        return;
      } else if (password.length < 8) {
        setError("A senha deve ter no mínimo 8 caracteres");
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
      setItem("tipo cadastro", response.data.usuario.cadastro);

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
    <div className={`login login-${theme}`}>
      <img
        className={`background background-${theme}`}
        src={theme === "light" ? JusticaRoxoFoto : BalancaRosaFoto}
        alt={`Banner-${theme}`}
      />
      <div className="formulario">
        <form
          onSubmit={handleSubmit}
          style={{
            height: `calc(450px + ${fontSizeModify * 10}px)`,
          }}
        >
          <h2 style={{ fontSize: `calc(26px + ${fontSizeModify}px)` }}>
            Login
          </h2>
          <div
            className="chart"
            style={{ fontSize: `calc(18px + ${fontSizeModify}px)` }}
          >
            <label>E-mail:</label>
            <input
              type="email"
              value={email}
              placeholder="Digite seu email."
              style={{
                height: `calc(26px + ${fontSizeModify * 2}px)`,
                fontSize: `calc(14px + ${fontSizeModify}px)`,
              }}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Senha:</label>
            <div className="input2">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Digite sua senha."
                style={{
                  height: `calc(26px + ${fontSizeModify * 2}px)`,
                  fontSize: `calc(14px + ${fontSizeModify}px)`,
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="olho-password">
                <img
                  src={showPassword ? olhoAberto : olhoFechado}
                  alt="Mostrar senha"
                  style={{
                    width: `calc(20px + ${fontSizeModify * 2}px)`,
                  }}
                  onClick={() => handleClickShowPassword()}
                />
              </div>
            </div>
          </div>

          <TipoCadastro titulo="Quero acessar como:" />

          {error && <span>{error}</span>}
          <div>
            <button
              type="submit"
              style={{
                width: `calc(70px + ${fontSizeModify * 2}px)`,
                fontSize: `calc(16px + ${fontSizeModify}px)`,
              }}
            >
              Login
            </button>
            <button
              type="button"
              style={{
                width: `calc(70px + ${fontSizeModify * 2}px)`,
                fontSize: `calc(16px + ${fontSizeModify}px)`,
              }}
              onClick={() => handleClearForm()}
            >
              Limpar
            </button>
          </div>

          <div
            className="bottom"
            style={{
              fontSize: `calc(16px + ${fontSizeModify}px)`,
            }}
          >
            <p>Ainda não tem cadastro?</p>
            <Link to="/register">Cadastre-se</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
