// src/components/premilitares/ResumenFinal.jsx

import React from 'react';
import { Typography, Box } from '@mui/material';

export default function ResumenFinal() {
  return (
    <Box textAlign="center">
      <Typography variant="h6" gutterBottom>
        ¡Registro completado!
      </Typography>
      <Typography>Los cupos fueron asignados correctamente.</Typography>
      <Typography sx={{ mt: 2 }}>✅ Puede cerrar esta ventana.</Typography>
    </Box>
  );
}
