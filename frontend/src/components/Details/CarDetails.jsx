import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL_DATACAR } from "../../api/api_car";

function CarDetails() {
  const { id } = useParams(); // Получаем серийный номер автомобиля из параметров URL
  const navigate = useNavigate();
  const [carInfo, setCarInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Токен не найден. Пожалуйста, авторизуйтесь.");
        }

        const response = await fetch(`${API_URL_DATACAR}?id=${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Ошибка сети: ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();
        setCarInfo(data[0]);
      } catch (error) {
        console.error("Произошла ошибка при выполнении запроса:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Произошла ошибка: {error.message}</div>;
  }

  if (!carInfo) {
    return <div>Информация об автомобиле не найдена.</div>;
  }

  return (
    <main className="container">
    <button className="btn" onClick={() => navigate(-1)}>Назад</button>
      <h5 className="center">Детальная информация об автомобиле</h5>
      <table className="centered">
        <thead>
          <tr>
            
          </tr>
        </thead>
        <tbody>
          {Object.entries({
            "Серийный номер автомобиля": carInfo.serialNumberCar,
            "Модель автомобиля": carInfo.vehicleModel?.name,
            "Серийный номер двигателя": carInfo.serialNumberEngine,
            "Модель двигателя": carInfo.engineModel?.name,
            "Серийный номер ведущего моста": carInfo.serialNumberDriveAxle,
            "Модель ведущего моста": carInfo.driveAxleModel?.name,
            "Серийный номер трансмиссии": carInfo.serialNumberTransmission,
            "Модель трансмиссии": carInfo.transmissionModel?.name,
            "Модель управляемого моста": carInfo.steeringAxleModel?.name,
            "Серийный номер управляемого моста":
              carInfo.serialNumberSteeringAxle,
            "Договор поставки": carInfo.supplyContract,
            "Дата отгрузки": carInfo.shippingDate,
            "Получатель": carInfo.consignee,
            "Адрес доставки": carInfo.deliveryAddress,
            "Оборудование": carInfo.equipment,
            "Клиент": carInfo.client?.user?.username,
            "Сервисная компания": carInfo.serviceCompany?.user?.username,
          }).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value || "Нет данных"}</td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </main>
  );
}

export { CarDetails };
