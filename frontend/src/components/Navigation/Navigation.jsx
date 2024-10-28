import React from 'react';
import { AppBar, Toolbar, Button, Box, Grid } from '@mui/material';
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
            <Grid container spacing={3} justifyContent="center">
              {navItems.map((item) => (
                <Grid item xs={12} sm="auto" key={item.path}>
                  <Button
                    color="#d50000 red accent-4"
                    component={Link}
                    to={item.path}
                    sx={{
                      fontWeight: location.pathname === item.path ? 'bold' : '700',
                      width: '100%', // Занять всю ширину в столбиковом режиме
                    }}
                  >
                    {item.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Toolbar>
      )}
    </AppBar>
  );
  



}

export default NavigationBar;


