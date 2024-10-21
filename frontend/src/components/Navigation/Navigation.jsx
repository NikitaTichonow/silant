import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import { useAuth } from "../AuthContext/AuthContext";

const Navigation = () => {
  const { isAuthenticated } = useAuth(); // Получаем состояние авторизации

  return (
    <AppBar position="static" >
      {isAuthenticated() && ( // Отображаем навигацию только если пользователь авторизован
        <Toolbar>
          <>
            <Button color="inherit" component={Link} to="/technical-data" >
              Технические данные
            </Button>
            <Button color="inherit" component={Link} to="/maintenance">
              Техническое обслуживание
            </Button>
            <Button color="inherit" component={Link} to="/complaints">
              Рекламации
            </Button>
          </>
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Navigation;
