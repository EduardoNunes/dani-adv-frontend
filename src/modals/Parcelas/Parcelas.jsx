import "./parcelas.css";

function Parcelas({
  newDatasParcelas,
  setNewDatasParcelas,
  setDatas_parcelas,
  quantidade_parcelas,
  setQuantidade_parcelas,
  valor_parcelas,
  setValor_parcelas,
  parcelas_pagas,
  setParcelas_pagas,
}) {
  const handleDataChange = (newValue, index) => {
    setNewDatasParcelas((prevData) => {
      const newDataArray = [...prevData];
      newDataArray[index] = newValue;

      return newDataArray;
    });    
  };

  return (
    <div className="parcelas">
      <label>Quantidade de parcelas:</label>
      <input
        type="number"
        value={quantidade_parcelas}
        onChange={(e) => setQuantidade_parcelas(e.target.value)}
      />
      <label>Valor das parcelas:</label>
      <input
        type="text"
        value={valor_parcelas}
        onChange={(e) => setValor_parcelas(e.target.value)}
      />
      <label>Parcelas:</label>
      <ul>
        {newDatasParcelas &&
          newDatasParcelas.map((data, key) => (
            <li key={key}>
              <input
                type="text"
                value={data}
                onChange={(e) => handleDataChange(e.target.value, key)}
              />
            </li>
          ))}
      </ul>
      <label>Parcelas Pagas:</label>
      <input
        type="text"
        value={parcelas_pagas}
        onChange={(e) => setParcelas_pagas(e.target.value)}
      />
    </div>
  );
}

export default Parcelas;
