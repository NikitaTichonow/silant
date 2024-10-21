import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext'; // Импортируйте ваш контекст аутентификации

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Получите информацию о пользователе из контекста

  if (!user) {
    // Если пользователь не авторизован, перенаправьте на страницу входа
    return <Navigate to="/" replace />;
  }

  return children; // Если авторизован, верните дочерние элементы
};

export default ProtectedRoute;