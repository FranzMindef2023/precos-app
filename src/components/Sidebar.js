import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from '@mui/material';
import {
  Home,
  Assignment,
  People,
  School,
  ExitToApp,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Sidebar = ({ drawerWidth = 240 }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem button component={Link} to="/apertura-de-cupos">
          <ListItemIcon>
            <Assignment />
          </ListItemIcon>
          <ListItemText primary="Apertura de Cupos" />
        </ListItem>
        <ListItem button component={Link} to="/premilitares">
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Estudiantes" />
        </ListItem>
        <ListItem button component={Link} to="/centros-educativos">
          <ListItemIcon>
            <School />
          </ListItemIcon>
          <ListItemText primary="Centros Educativos" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
