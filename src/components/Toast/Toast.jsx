import { useModal } from "../../context/ModalsContext";
import { useTheme } from "../../context/ThemeContext";
import "./toast.css";

function Toast() {
  const { theme } = useTheme();
  const { openToast, showMensagem, color } = useModal();

  return (
    <div
      className={`toast toast-${openToast} toast-${theme}`}
      style={{ border: `1px solid ${color}`, color: `${color}` }}
    >
      <p>{showMensagem}</p>
    </div>
  );
}

export default Toast;
