import EditBlack from "../../assets/edit-black.png";
import EditWhite from "../../assets/edit-white.png";
import TrashWhite from "../../assets/trash-white.png";
import TrashBlack from "../../assets/trash-black.png";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { getItem } from "../../utils/storage";

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
  const [processCount, setProcessCount] = useState({});

  useEffect(() => {
    if (selectedOption === "clientes") {
      const token = getItem("token");

      async function countProcessForClient() {
        try {
          const response = await api.get(`/listarQuantidadeProcessosClientes`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const processCountData = response.data.reduce((acumulador, atual) => {
            acumulador[atual.cliente_id] = atual.quantidade_de_processos;
            return acumulador;
          }, {});

          setProcessCount(processCountData);
        } catch (error) {
          console.error(error);
        }
      }

      countProcessForClient();
    }
  }, [selectedOption]);

  return (
    <div className="content">
      <div className="title">
        <ul>
          <li>{titulo1}:</li>
          <li>{titulo2}:</li>
          <li>{titulo3}:</li>
          <li>{titulo4}:</li>
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
                  title={data.contratante}
                  onClick={() => handleOpenDetails(true, data)}
                >
                  <p> {data.contratante}</p>{" "}
                </li>
                <li title={data.numero}>
                  <p>{data.numero}</p>
                </li>
                <li title={data.tipo_acao}>
                  <p>{data.tipo_acao}</p>
                </li>
                <li title={data.atualizado}>
                  <p>{data.atualizado}</p>
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
                <li>
                  <p>{processCount[data.id]}</p>
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