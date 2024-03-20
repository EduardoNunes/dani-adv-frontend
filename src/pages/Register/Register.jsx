import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BalancePinkImg from "../../assets/balanca-rosa.jpg";
import JusticePurpleImg from "../../assets/martelo-ouro.jpg";
import olhoAberto from "../../assets/olho-aberto.png";
import olhoFechado from "../../assets/olho-fechado.png";
import TipoCadastro from "../../components/TipoCadastro/TipoCadastro";
import { useFontSize } from "../../context/FontSizeContext";
import { useModal } from "../../context/ModalsContext";
import { useTheme } from "../../context/ThemeContext";
import { useTipoCadastroContext } from "../../context/TipoCadastroContext";
import { useValidationsContext } from "../../context/ValidationsContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import "./register.css";

function RegisterPage() {
  const { theme } = useTheme();
  const { selectedOption, setSlecetedOption } = useTipoCadastroContext();
  const { validationPassword, mensagemError, validationEmail, validationName, validationConfirmPassword } =
    useValidationsContext();
  const { handleClickOpenMessageToast } = useModal();
  const { fontSizeModify } = useFontSize();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(olhoFechado);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    try {
      let mensagemError = await validationName(name);

      if (mensagemError) {
        setError(mensagemError);
        return;
      }

      mensagemError = await validationEmail(email);

      if (mensagemError) {
        setError(mensagemError);
        return;
      }

      mensagemError = await validationPassword(password);

      if (mensagemError) {
        setError(mensagemError);
        return;
      }

      mensagemError = await validationConfirmPassword(password, confirmPassword);

      if (mensagemError) {
        setError(mensagemError);
        return;
      }

      if (!selectedOption) {
        setError("Escolha um tipo de cadastro");
        return;
      }

      await api.post("/cadastrarUsuario", {
        nome: name,
        email: email,
        senha: password,
        tipoCadastro: selectedOption,
      });

      navigate("/login");
      handleClickOpenMessageToast(true, "Usuário cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro na solicitação:", error.message);
      setError(mensagemError || error.response.data.mensagem);
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
      navigate("/client");
    }
  });

  return (
    <div className={`register register-${theme}`}>
      <img
        className={`background background-${theme}`}
        src={theme === "light" ? JusticePurpleImg : BalancePinkImg}
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
            <label>Confirmar senha:</label>
            <div className="input2">
              <input
                type={showPassword === olhoAberto ? "text" : "password"}
                value={confirmPassword}
                placeholder="Digite sua senha."
                style={{
                  height: `calc(26px + ${fontSizeModify * 2}px)`,
                  fontSize: `calc(14px + ${fontSizeModify}px)`,
                }}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

          <TipoCadastro titulo="Quero me cadastrar como:" page="register" />

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
