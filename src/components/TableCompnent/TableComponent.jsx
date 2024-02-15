import EditBlack from "../../assets/edit-black.png";
import EditWhite from "../../assets/edit-white.png";
import TrashWhite from "../../assets/trash-white.png";
import TrashBlack from "../../assets/trash-black.png";

function TableComponent({
  selectedOption,
  titulo1,
  titulo2,
  titulo3,
  titulo4,
  titulo5,
  datas,
  handleOpenDetails,
  handleClickOpenEdit,
  handleClickOpenDeleteConfirm,
  theme,
}) {

  return (
    <div className="content">
      <div className="title">
        <ul>
          <li>{titulo1}</li>
          <li>{titulo2}</li>
          <li>{titulo3}</li>
          <li>{titulo4}</li>
          <li>{titulo5}:</li>
          <li></li>
        </ul>
      </div>
      <div className="body">
        {datas && datas.length === 0 ? (
          <span>Não encontramos dados para esta opção.</span>
        ) : selectedOption === "processos" ? (
          datas &&
          datas.map((data, index) => (
            <div key={index} className="line">
              <ul>
                <li
                  title={data.autor}
                  onClick={() => handleOpenDetails(true, data)}
                >
                  <p> {data.autor}</p>{" "}
                </li>
                <li title={data.reu}>
                  <p>{data.reu}</p>
                </li>
                <li title={data.numero}>
                  <p>{data.numero}</p>
                </li>
                <li title={data.vara}>
                  <p>{data.vara}</p>
                </li>
                <li title={data.atualizado}>
                  <p>{data.atualizado}</p>
                </li>
                <li>
                  <img
                    src={theme === "light" ? EditBlack : EditWhite}
                    alt="Edit Icon"
                    onClick={() => handleClickOpenEdit(true, data)}
                  />
                  <img
                    src={theme === "light" ? TrashBlack : TrashWhite}
                    alt="Trash Icon"
                    onClick={() =>
                      handleClickOpenDeleteConfirm(
                        true,
                        "Tem certeza que deseja excluir este dados?",
                        data.id,
                        selectedOption,
                        "teste"
                      )
                    }
                  />
                </li>
              </ul>
            </div>
          ))
        ) : (
          datas &&
          datas.map((data, index) => (
            <div key={index} className="line">
              <ul>
                <li
                  title={data.nome}
                  onClick={() => handleOpenDetails(true, data)}
                >
                  <p> {data.nome}</p>{" "}
                </li>
                <li title={data.email}>
                  <p>{data.email}</p>
                </li>
                <li title={data.celular}>
                  <p>{data.celular}</p>
                </li>
                <li title={data.cpf}>
                  <p>{data.cpf}</p>
                </li>
                <li title={data.status}>
                  <p>{data.status}</p>
                </li>
                <li>
                  <img
                    src={theme === "light" ? EditBlack : EditWhite}
                    alt="Edit Icon"
                    onClick={() => handleClickOpenEdit(true, data)}
                  />
                  <img
                    src={theme === "light" ? TrashBlack : TrashWhite}
                    alt="Trash Icon"
                    onClick={() =>
                      handleClickOpenDeleteConfirm(
                        true,
                        "Tem certeza que deseja excluir este dados?",
                        data.id,
                        selectedOption,
                        "teste"
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
