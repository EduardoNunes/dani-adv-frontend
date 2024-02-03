import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BalancaRosaFoto from "../../assets/balanca-rosa.jpg";
import JusticaRoxoFoto from "../../assets/martelo-ouro.jpg";
import olhoAberto from "../../assets/olho-aberto.png";
import olhoFechado from "../../assets/olho-fechado.png";
import { useFontSize } from "../../context/FontSizeContext";
import { useTheme } from "../../context/ThemeContext";
import api from "../../services/api";
import "./register.css";
import TipoCadastro from "../../components/TipoCadastro/TipoCadastro";
import { useTipoCadastroContext } from "../../context/TipoCadastroContext";
import { getItem } from "../../utils/storage";

function RegisterPage() {
  const { theme } = useTheme();
  const { selectedOption, setSlecetedOption } = useTipoCadastroContext();
  const { fontSizeModify } = useFontSize();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(olhoFechado);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    try {
      if (!name) {
        setError("O campo nome está vazio");
        return;
      } else if (!email) {
        setError("O campo e-mail está vazio");
        return;
      } else if (!password) {
        setError("O campo senha está vazio");
        return;
      } else if (password.length < 8) {
        setError("A senha deve ter no mínimo 8 caracteres");
        return;
      } else if (!selectedOption) {
        setError("Escolha um tipo de cadastro");
        return;
      }

      await api.post("/usuario", {
        nome: name,
        email: email,
        senha: password,
        tipoCadastro: selectedOption,
      });

      navigate("/login");
    } catch (error) {
      console.error("Erro na solicitação:", error.message);
      setError("Ocorreu um erro ao processar a solicitação");
    }
  }

  function handleClearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setSlecetedOption("");
    setError("");
  }

  function handleClickShowPassword() {
    setShowPassword(showPassword === olhoAberto ? olhoFechado : olhoAberto);
  }

  useEffect(() => {
    if (getItem("token")) {
      navigate("/client")
    }
  }, )

  return (
    <div className={`register register-${theme}`}>
      <img
        className={`background background-${theme}`}
        src={theme === "light" ? JusticaRoxoFoto : BalancaRosaFoto}
        alt={`Banner-${theme}`}
      />
      <div className="formulario">
        <form
          onSubmit={handleSubmit}
          style={{
            height: `calc(550px + ${fontSizeModify * 10}px)`,
          }}
        >
          <h2 style={{ fontSize: `calc(26px + ${fontSizeModify}px)` }}>
            Cadastrar
          </h2>
          <div
            className="chart"
            style={{ fontSize: `calc(18px + ${fontSizeModify}px)` }}
          >
            <label>Nome:</label>
            <input
              type="text"
              value={name}
              placeholder="Digite seu nome."
              style={{
                height: `calc(26px + ${fontSizeModify * 2}px)`,
                fontSize: `calc(14px + ${fontSizeModify}px)`,
              }}
              onChange={(e) => setName(e.target.value)}
            />

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
                type={showPassword === olhoAberto ? "text" : "password"}
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
                  src={showPassword}
                  alt=""
                  style={{
                    width: `calc(20px + ${fontSizeModify * 2}px)`,
                  }}
                  onClick={() => handleClickShowPassword()}
                />
              </div>
            </div>
          </div>

          <TipoCadastro 
            titulo = "Quero me cadastrar como:"
          />

          {error && <span>{error}</span>}
          <div>
            <button
              type="submit"
              style={{
                width: `calc(90px + ${fontSizeModify * 2}px)`,
                fontSize: `calc(16px + ${fontSizeModify}px)`,
              }}
            >
              Cadastrar
            </button>
            <button
              type="button"
              style={{
                width: `calc(90px + ${fontSizeModify * 2}px)`,
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
            <p>Já tem cadastro?</p>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;