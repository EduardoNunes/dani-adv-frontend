import EditBlack from "../../assets/edit-black.png";
import EditWhite from "../../assets/edit-white.png";
import TrashWhite from "../../assets/trash-white.png";
import TrashBlack from "../../assets/trash-black.png";

function TableComponent({
  autor,
  reu,
  numProcesso,
  vara,
  dataProcess,
  handleOpenProcessDetails,
  handleClickOpenEditProcess,
  handleClickOpenConfirm,
  theme,
}) {
  return (
    <div className="content">
      <div className="title">
        <ul>
          <li>{autor}</li>
          <li>{reu}</li>
          <li>{numProcesso}</li>
          <li>{vara}</li>
          <li>Vara:</li>
          
          <li></li>
        </ul>
      </div>
      <div className="body">
        {dataProcess && dataProcess.length === 0 ? (
          <span>Não encontramos processos para esta conta</span>
        ) : (
          dataProcess &&
          dataProcess.map((processo, index) => (
            <div key={index} className="line">
              <ul>
                <li
                  title={processo.autor}
                  onClick={() => handleOpenProcessDetails(true, processo)}
                >
                  <p> {processo.autor}</p>{" "}
                </li>
                <li title={processo.reu}>
                  <p>{processo.reu}</p>
                </li>
                <li title={processo.numero}>
                  <p>{processo.numero}</p>
                </li>
                <li title={processo.vara}>
                  <p>{processo.vara}</p>
                </li>
                <li title={processo.atualizado}>
                  <p>{processo.atualizado}</p>
                </li>
                <li>
                  <img
                    src={theme === "light" ? EditBlack : EditWhite}
                    alt="Edit Icon"
                    onClick={() => handleClickOpenEditProcess(true, processo)}
                  />
                  <img
                    src={theme === "light" ? TrashBlack : TrashWhite}
                    alt="Trash Icon"
                    onClick={() =>
                      handleClickOpenConfirm(
                        true,
                        "Tem certeza que deseja excluir este processo?",
                        processo.id
                      )
                    }
                  />
                </li>
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TableComponent;
