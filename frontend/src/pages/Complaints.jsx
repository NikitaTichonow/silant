import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

function Complaints() {
  const [data, setData] = useState([]);
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

    // Получаем список автомобилей 
    const cars = decodedToken.cars;

    if (!cars || cars.length === 0) {
      setError(new Error("Не удалось получить данные автомобилей из токена."));
      return;
    }

    // Собираем все рекламации из автомобилей
    const complaints = cars.flatMap((car) => {
      const carComplaints = car.complaints || [];
      // Добавляем информацию об автомобиле к каждой рекламации
      return carComplaints.map((complaint) => ({
        ...complaint,
        serialNumberCar: car.serialNumberCar || "Неизвестен",
        vehicleModel: car.vehicleModel?.name || "Неизвестна",
      }));
    });

    if (complaints.length === 0) {
      setError(new Error("Данные рекламаций отсутствуют."));
      return;
    }

    // Обновляем состояние
    setData(complaints);
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
              <th>Дата отказа</th>
              <th>Наработка, м/час</th>
              <th>Узел отказа</th>
              <th>Описание отказа</th>
              <th>Способ восстановления</th>
              <th>Используемые запасные части</th>
              <th>Дата восстановления</th>
              <th>Модель автомобиля</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="centered">
                <td>{item.dateOfRefusal || "Нет данных"}</td>
                <td>{item.operatingTime || "Нет данных"}</td>
                <td> <Link to={`/car/datafailurenode/${item.failureNode}`}>{item.failureNode || "Нет данных"}</Link></td>
                <td>{item.descriptionOfFailure || "Нет данных"}</td>
                <td> <Link to={`/car/datarecoverymethod/${item.recoveryMethod}`}>{item.recoveryMethod || "Нет данных"}</Link></td>
                <td>{item.sparePartsUsed || "Нет данных"}</td>
                <td>{item.restoreDate || "Нет данных"}</td>
                <td>{item.vehicleModel || "Нет данных"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export { Complaints };
