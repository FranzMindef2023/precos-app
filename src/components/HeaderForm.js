import React from 'react';
import { Typography, Box } from '@mui/material';

const HeaderForm = () => {
  return (
    <Box sx={{ backgroundColor: 'primary.main', color: 'white', py: 2, textAlign: 'center' }}>
      <Typography variant="h6">
        Sistema de Asignación de Cupos - Servicio Premilitar
      </Typography>
      <Typography variant="subtitle2">
        Ministerio de Defensa
      </Typography>
    </Box>
  );
};

export default HeaderForm;
