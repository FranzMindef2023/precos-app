// src/components/premilitares/AperturaForm.jsx

import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Slider,
  MenuItem,
} from '@mui/material';

export default function AperturaForm({ formData, setFormData }) {
  const handleChange = (field) => (event, value) => {
    const val = value !== undefined ? value : event.target.value;
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Fecha Límite de Edad"
          type="date"
          value={formData.fechaLimiteEdad}
          onChange={handleChange('fechaLimiteEdad')}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Fecha Límite de Apertura"
          type="date"
          value={formData.fechaLimiteApertura}
          onChange={handleChange('fechaLimiteApertura')}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography gutterBottom variant="body1" sx={{ fontWeight: 500 }}>
          Edad Mínima: {formData.edadMin} años
        </Typography>
        <Slider
          value={formData.edadMin}
          onChange={handleChange('edadMin')}
          min={14}
          max={24}
          valueLabelDisplay="auto"
          sx={{ mt: 1 }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography gutterBottom variant="body1" sx={{ fontWeight: 500 }}>
          Edad Máxima: {formData.edadMax} años
        </Typography>
        <Slider
          value={formData.edadMax}
          onChange={handleChange('edadMax')}
          min={14}
          max={24}
          valueLabelDisplay="auto"
          sx={{ mt: 1 }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          select
          fullWidth
          label="Gestión"
          value={formData.gestion}
          onChange={handleChange('gestion')}
          variant="outlined"
        >
          <MenuItem value="2025">2025</MenuItem>
          <MenuItem value="2026">2026</MenuItem>
          <MenuItem value="2027">2027</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          type="number"
          fullWidth
          label="Cantidad de Estudiantes"
          value={formData.cantidadEstudiantes}
          onChange={handleChange('cantidadEstudiantes')}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
}
