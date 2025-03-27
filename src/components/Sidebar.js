import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider } from '@mui/material';
import { Home, Assignment, People, School, ExitToApp } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = ({ drawerWidth = 240 }) => {
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
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem button component={Link} to="/premilitares">
          <ListItemIcon><Assignment /></ListItemIcon>
          <ListItemText primary="Premilitares" />
        </ListItem>
        <ListItem button component={Link} to="/premilitares">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Estudiantes" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><School /></ListItemIcon>
          <ListItemText primary="Centros Educativos" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
