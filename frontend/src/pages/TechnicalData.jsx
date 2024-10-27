import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function TechnicalData() {
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

    console.log("Декодированный токен:", decodedToken);

    // Получаем cars из токена
    const cars = decodedToken.cars;

    if (!cars) {
      setError(new Error("Не удалось получить данные автомобилей из токена."));
      return;
    }

    // Обновляем состояние
    setData(cars);
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
              <th>Серийный номер вашей машины</th>
              <th>Модель автомобиля</th>
              <th>Договор поставки</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="center-align">
                <td>
                  <Link to={`/car/${item.id}`}>{item.serialNumberCar}</Link>
                </td>
                <td>{item.vehicleModel?.name || "Нет данных"}</td>
                <td> № {item.supplyContract || "Нет данных"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export { TechnicalData };
