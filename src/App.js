import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import routes from './routes';
import Sidebar from './components/Sidebar';
import HeaderForm from './components/HeaderForm';
import FooterForm from './components/FooterForm';

const drawerWidth = 240;

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar drawerWidth={drawerWidth} />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <HeaderForm />
          <Routes>
            {routes.map(({ path, component: Component }, index) => (
              <Route key={index} path={path} element={<Component />} />
            ))}
          </Routes>
          <FooterForm />
        </Box>
      </Box>
    </Router>
  );
}

export default App;
