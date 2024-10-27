import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

function TechnicalMaintenance() {
  const [data, setData] = useState([]); // Инициализируем data как массив
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError(new Error("Токен не найден. Пожалуйста, авторизуйтесь."));
      return;
    }

    let decodedToken;
    try {
      decodedToken = jwtDecode(token);
    } catch (decodeError) {
      setError(new Error("Ошибка декодирования токена."));
      return;
    }

    console.log("Декодированный токен:", decodedToken);

    // Получаем список автомобилей из токена
    const cars = decodedToken.cars;

    if (!cars || cars.length === 0) {
      setError(new Error("Не удалось получить данные автомобилей из токена."));
      return;
    }

    // Собираем все maintenances из автомобилей
    const maintenances = cars.flatMap((car) => {
      const carMaintenances = car.maintenances || [];
      // Добавляем информацию об автомобиле в каждый объект ТО
      return carMaintenances.map((maintenance) => ({
        ...maintenance,
        serialNumberCar: car.serialNumberCar || "Неизвестен",
        vehicleModel: car.vehicleModel?.name || "Неизвестна",
      }));
    });

    if (maintenances.length === 0) {
      setError(new Error("Данные ТО отсутствуют."));
      return;
    }

    // Обновляем состояние
    setData(maintenances);
  }, []);

  // Рендеринг компонента
  if (error) {
    return <div>Произошла ошибка: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>Данных нет.</div>;
  }

  // Финальный рендеринг с таблицей данных
  return (
    <main className="container content">
      <div className="table-responsive">
        <table className="highlight">
          <thead>
            <tr>
              <th>Модель автомобиля</th>
              <th>Серийный номер</th>
              <th>Вид ТО</th>
              <th>Дата проведения ТО</th>
              <th>Наработка, м/час</th>
              <th>№ заказ-наряда</th>
              <th>Дата заказ-наряда</th>
              <th>Организация, проводившая ТО</th>
              <th>Сервисная компания</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="center-align">
                <td>{item.vehicleModel || "Нет данных"}</td>
                <td>{item.serialNumberCar || "Нет данных"}</td>
                <td> <Link to={`/car/datatypeofmaintenance/${item.typeOfMaintenance}`}>{item.typeOfMaintenance || "Нет данных"}</Link></td>
                <td>{item.dataOfMaintenance || "Нет данных"}</td>
                <td>{item.operatingTime || "Нет данных"}</td>
                <td>{item.workOrderNumber || "Нет данных"}</td>
                <td>{item.workOrderDate || "Нет данных"}</td>
                <td> <Link to={`/car/dataorganizationofmaintenance/${item.organizationOfMaintenance}`}>{item.organizationOfMaintenance || "Нет данных"}</Link></td>
                <td>{item.serviceCompany || "Нет данных"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export { TechnicalMaintenance };
