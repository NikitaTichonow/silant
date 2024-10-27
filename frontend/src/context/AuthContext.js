// AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { API_URL_TOKEN2 } from "../api/api_user";




const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const login = async (username, password) => {
    try {
      const response = await axios.post(API_URL_TOKEN2, {
        username,
        password,
      });
      const tokens = response.data;
      // console.log('Полученные токены при логине:', tokens);
      localStorage.setItem('token', tokens.access);
      setUser({
        tokens,
        user_id: tokens.user_id, // или decodedToken.user_id после декодирования
        username, // используем введённый username
      });
      navigate('/technical-data'); // Перенаправляем на /technical-data
    } catch (error) {
      // console.error('Ошибка при авторизации:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    // console.log('Токен из localStorage:', token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // console.log('Декодированный токен:', decodedToken);
        const userData = {
          tokens: { access: token },
          user_id: decodedToken.user_id,
          username: decodedToken.username,
        };
        // console.log('Устанавливаем пользователя:', userData);
        setUser(userData);
      } catch (error) {
        // console.error('Ошибка декодирования токена:', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   // console.log('Состояние user обновилось:', user);
  // }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
