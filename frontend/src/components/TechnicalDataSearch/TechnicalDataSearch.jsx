import React, { useState } from "react";
import axios from "axios";
import { API_URL_DATACAR } from "../../api/api_car";

function TechnicalDataSearch() {
  const [serialNumber, setSerialNumber] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!serialNumber.trim()) {
      setError("Пожалуйста, введите заводской номер.");
      setData(null);
      return;
    }

    try {
      const response = await axios.get(`${API_URL_DATACAR}?id=${serialNumber}`);
      setData(response.data[0]);
      setError("");
    } catch (err) {
      setError("Данных о машине с таким заводским номером нет в системе.");
      setData(null);
    }
  };

  return (
    <div className="">
      <h4>Поиск информации о технике</h4>
      <div className="input-field ">
        <input
          type="text"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          placeholder="Введите заводской номер"
          
        />
        <button className="btn" onClick={handleSearch}>
          Поиск
        </button>
      </div>
      {error && <div className="red-text">{error}</div>}
      {data && (
        <div>
          <h5>
            Информация о комплектации и технических характеристиках Вашей
            техники:
          </h5>
          <table className="striped" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{ width: "30%" }}></th>
                <th style={{ width: "70%" }}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Модель автомобиля</td>
                <td>{data.vehicleModel.name}</td>
              </tr>
              <tr>
                <td>Описание модели автомобиля</td>
                <td>{data.vehicleModel.description}</td>
              </tr>
              <tr>
                <td>Модель двигателя</td>
                <td>{data.engineModel.name}</td>
              </tr>
              <tr>
                <td>Описание модели двигателя</td>
                <td>{data.engineModel.description}</td>
              </tr>
              <tr>
                <td>Модель трансмиссии</td>
                <td>{data.transmissionModel.name}</td>
              </tr>
              <tr>
                <td>Описание модели трансмиссии</td>
                <td>{data.transmissionModel.description}</td>
              </tr>
              <tr>
                <td>Модель переднего моста</td>
                <td>{data.driveAxleModel.name}</td>
              </tr>
              <tr>
                <td>Описание модели переднего моста</td>
                <td>{data.driveAxleModel.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export { TechnicalDataSearch };
