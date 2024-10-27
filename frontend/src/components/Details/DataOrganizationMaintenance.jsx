import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL_DATA_ORGANIZATION_OF_MAIN_TENANCE } from "../../api/api_car";

function Organization() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [typeInfo, setTypeInfo] = useState(null);
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

        const response = await fetch(`${API_URL_DATA_ORGANIZATION_OF_MAIN_TENANCE}?name=${name}`, {
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
        setTypeInfo(data[0]);
      } catch (error) {
        console.error("Произошла ошибка при выполнении запроса:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [name]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Произошла ошибка: {error.message}</div>;
  }

  if (!typeInfo) {
    return <div>Информация о ТО не найдена.</div>;
  }

  return (
    <main className="container content">
    <button className="btn" onClick={() => navigate(-1)}>Назад</button>
      <h4 className="center">Детальная информация об организации</h4>
      <table className="centered">
        <tbody>
          {Object.entries({
            "Название организации": typeInfo.name,
            "Описание": typeInfo.description,
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

export { Organization };