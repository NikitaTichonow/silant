import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL_DATA_FALULE_NODE } from "../../api/api_car";

function FailureNode() {
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

        const response = await fetch(`${API_URL_DATA_FALULE_NODE}?name=${name}`, {
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
      <h4 className="center">Детальная информация о виде технического обслуживания</h4>
      <table className="centered">
        <tbody>
          {Object.entries({
            "Вид технического обслуживания": typeInfo.name,
            "Описание технического обслуживания": typeInfo.description,
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

export { FailureNode };