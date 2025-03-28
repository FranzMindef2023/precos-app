import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import routes from './routes/routes';
import Sidebar from './components/Sidebar';
import HeaderForm from './components/HeaderForm';
import FooterForm from './components/FooterForm';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

const drawerWidth = 240;

function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        {routes.map(({ path, component: Component, isPublic }, index) =>
          isPublic ? (
            // Rutas públicas como /login: SIN layout, protegidas por PublicRoute
            <Route
              key={index}
              path={path}
              element={
                <PublicRoute>
                  <Component />
                </PublicRoute>
              }
            />
          ) : (
            // Rutas privadas: CON layout y protegidas por PrivateRoute
            <Route
              key={index}
              path={path}
              element={
                <PrivateRoute>
                  <Box sx={{ display: 'flex' }}>
                    <Sidebar drawerWidth={drawerWidth} />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                      <HeaderForm />
                      <Component />
                      <FooterForm />
                    </Box>
                  </Box>
                </PrivateRoute>
              }
            />
          )
        )}
      </Routes>
    </Router>
  );
}

export default App;
