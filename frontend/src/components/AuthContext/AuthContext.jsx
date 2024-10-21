import React, { createContext, useContext, useState, useEffect } from "react";
import { API_URL_TOKEN } from "../../api/api_user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");



  // Проверка наличия данных пользователя в localStorage при инициализации
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Устанавливаем loading в false после проверки
  }, []);


  const login = async (username, password) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(API_URL_TOKEN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid username or password");
      }

      const data = await response.json();
      setUser(data);  // Сохраняем данные пользователя
      localStorage.setItem("user", JSON.stringify(data)); // Сохраняем данные в localStorage
      console.log("Login successful:", data);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null); // Очистите данные пользователя
    localStorage.removeItem("user"); // Удаляем данные из localStorage
  };

  const isAuthenticated = () => {
    return user !== null; // Проверка аутентификации
  };



  return (
    <AuthContext.Provider
      value={{ user, loading, errorMessage, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
