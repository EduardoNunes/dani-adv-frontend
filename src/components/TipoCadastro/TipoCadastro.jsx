import { useTheme } from "../../context/ThemeContext";
import { useTipoCadastroContext } from "../../context/TipoCadastroContext";
import "./tipo-cadastro.css";

function TipoCadastro({ titulo }) {
  const { selectedOption, setSelectedOption } = useTipoCadastroContext();
  const { theme } = useTheme();

  return (
    <div className={`tipo-cadastro tipo-cadastro-${theme}`}>
      <h4>{titulo}</h4>
      <div className="cliente">
        <input
          type="radio"
          name="cliente"
          value="cliente"
          checked={selectedOption === "cliente"}
          onChange={() => setSelectedOption("cliente")}
        />
        <label>Cliente</label>
      </div>
      <div className="estudante">
        <input
          type="radio"
          name="estudante"
          value="estudante"
          checked={selectedOption === "estudante"}
          onChange={() => setSelectedOption("estudante")}
        />
        <label>Estudante</label>
      </div>
      <div className="escritorio">
        <input
          type="radio"
          name="escritorio"
          value="escritorio"
          checked={selectedOption === "escritorio"}
          onChange={() => setSelectedOption("escritorio")}
        />
        <label>Escritório</label>
      </div>
    </div>
  );
}

export default TipoCadastro;
