import { useModal } from "../../context/ModalsContext";
import { useTheme } from "../../context/ThemeContext";
import "./toast.css";

function Toast() {
  const { theme } = useTheme();
  const { openToast, mensagem } = useModal();

  return (
    <div className={`toast toast-${openToast} toast-${theme}`}>
      <p>{mensagem}</p>
    </div>
  );
}

export default Toast;
