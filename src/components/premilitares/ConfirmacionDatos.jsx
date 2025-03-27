// src/components/premilitares/ConfirmacionDatos.jsx

import React from 'react';
import { Typography, Box } from '@mui/material';

export default function ConfirmacionDatos({ formData }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Confirmación de Datos
      </Typography>
      <Typography>Fecha límite de edad: {formData.fechaLimiteEdad || '(no definido)'}</Typography>
      <Typography>Fecha límite de apertura: {formData.fechaLimiteApertura || '(no definido)'}</Typography>
      <Typography>Edad mínima: {formData.edadMin}</Typography>
      <Typography>Edad máxima: {formData.edadMax}</Typography>
      <Typography>Gestión: {formData.gestion}</Typography>
      <Typography>Cantidad de estudiantes: {formData.cantidadEstudiantes}</Typography>
    </Box>
  );
}
