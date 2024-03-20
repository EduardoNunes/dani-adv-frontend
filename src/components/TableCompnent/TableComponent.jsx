import { useEffect, useState } from "react";
import EditBlack from "../../assets/edit-black.png";
import EditWhite from "../../assets/edit-white.png";
import ListBlack from "../../assets/list-black.png";
import ListWhite from "../../assets/list-white.png";
import PaymentBlack from "../../assets/pagamento-black.png";
import PaymentWhite from "../../assets/pagamento-white.png";
import TrashBlack from "../../assets/trash-black.png";
import TrashWhite from "../../assets/trash-white.png";
import { useModal } from "../../context/ModalsContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import "./table-component.css";

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
  const { handleClickOpenFinanceiroProcessComponent } = useModal();
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
    <div className="table-component">
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
          datas.map((data, index) => {
            let color;
            switch (data.status) {
              case "Quitado":
                color = "green";
                break;
              case "Atrasado":
                color = "red";
                break;
              case "Em dia":
                color = "blue";
                break;
              default:
                break;
            }

            function invertData(data) {
              if (data) {
                const dataFormat = data.split("-");
                const newData = `${dataFormat[2]}-${dataFormat[1]}-${dataFormat[0]}`;

                return newData;
              }
            }

            return (
              <div key={index} className="line">
                <ul>
                  <li
                    title={data.contratante}
                    onClick={() => handleOpenDetails(true, data)}
                  >
                    <p> {data.contratante}</p>{" "}
                    <img
                      src={theme === "light" ? ListBlack : ListWhite}
                      alt="ícone lista"
                    />
                  </li>
                  <li title={data.numero}>
                    <p>{data.numero}</p>
                  </li>
                  <li title={data.tipo_acao}>
                    <p>{data.tipo_acao}</p>
                  </li>
                  <li title={invertData(data.atualizado)}>
                    <p>{invertData(data.atualizado)}</p>
                  </li>
                  <li
                    className="status-financeiro"
                    title={data.status}
                    style={{ color: `${color}` }}
                    onClick={() =>
                      handleClickOpenFinanceiroProcessComponent(
                        true,
                        data.id,
                        "view"
                      )
                    }
                  >
                    <p>{data.status}</p>
                    <img
                      src={theme === "light" ? ListBlack : ListWhite}
                      alt="ícone lista"
                    />
                  </li>
                  <li>
                    <img
                      src={theme === "light" ? EditBlack : EditWhite}
                      alt="Edit Icon"
                      onClick={() => handleClickOpenEdit(true, data)}
                    />
                    <img
                      src={theme === "light" ? PaymentWhite : PaymentBlack}
                      alt="Edit Icon"
                      onClick={() =>
                        handleClickOpenFinanceiroProcessComponent(
                          true,
                          data.id,
                          "edit"
                        )
                      }
                    />
                    <img
                      src={theme === "light" ? TrashBlack : TrashWhite}
                      alt="Trash Icon"
                      onClick={() =>
                        handleClickOpenDeleteConfirm(
                          true,
                          "Exluir um processo implica em excluir também os dados financeiros relacionados a este processo. Deseja prosseguir?",
                          data.id,
                          selectedOption
                        )
                      }
                    />
                  </li>
                </ul>
              </div>
            );
          })
        ) : (
          datas &&
          datas.map((data, index) => {
            let color;
            switch (data.status) {
              case "Quitado":
                color = "green";
                break;
              case "Atrasado":
                color = "red";
                break;
              case "Em dia":
                color = "blue";
                break;
              default:
                break;
            }
            return (
              <div key={index} className="line">
                <ul>
                  <li
                    title={data.nome}
                    onClick={() => handleOpenDetails(true, data)}
                  >
                    <p> {data.nome}</p>{" "}
                    <img
                      src={theme === "light" ? ListBlack : ListWhite}
                      alt="ícone lista"
                    />
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
                  <li
                    className="status-financeiro"
                    title={data.status}
                    style={{ color: `${color}` }}
                  >
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
                          "Tem certeza que deseja excluir este cliente?",
                          data.id,
                          selectedOption
                        )
                      }
                    />
                  </li>
                </ul>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default TableComponent;
