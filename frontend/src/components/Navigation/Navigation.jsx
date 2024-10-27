import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function NavigationBar() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: 'Технические данные', path: '/technical-data' },
    { label: 'Техническое обслуживание', path: '/maintenance' },
    { label: 'Рекламации', path: '/complaints' },
  ];

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      {isAuthenticated() && (
        <Toolbar>
          <Box display="flex" justifyContent="center" color={'white'} padding={6} gap={3} width="100%">
            {navItems.map((item) => (
              <Button
                key={item.path}
                color="#0d47a1 blue darken-2"
                component={Link}
                to={item.path}
                sx={{
                  fontWeight: location.pathname === item.path ? 'bold' : '700',
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      )}
    </AppBar>
  );
}

export default NavigationBar;


