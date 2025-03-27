// src/components/premilitares/ModalNuevoRegistro.jsx

import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Slider,
  Grid,
  Divider,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function ModalNuevoRegistro({ open, onClose }) {
  const today = new Date().toISOString().split('T')[0];

  const validationSchema = Yup.object({
    fechaLimiteEdad: Yup.date().required('Campo requerido'),
    fechaLimiteApertura: Yup.date()
      .max(new Date(), 'No puede ser una fecha futura')
      .required('Campo requerido'),
    edadMin: Yup.number()
      .min(14)
      .max(24)
      .required()
      .test('edadMin < edadMax', 'Debe ser menor que la edad máxima', function (value) {
        return value < this.parent.edadMax;
      }),
    edadMax: Yup.number()
      .min(14)
      .max(24)
      .required()
      .test('edadMax > edadMin', 'Debe ser mayor que la edad mínima', function (value) {
        return value > this.parent.edadMin;
      }),
    gestion: Yup.string().required('Campo requerido'),
    cantidadEstudiantes: Yup.number()
      .min(1, 'Debe ser al menos 1')
      .required('Campo requerido'),
  });

  const formik = useFormik({
    initialValues: {
      fechaLimiteEdad: '',
      fechaLimiteApertura: today,
      edadMin: 16,
      edadMax: 17,
      gestion: '2025',
      cantidadEstudiantes: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Registro guardado:', values);
      onClose();
    },
  });

  return (
    <Modal open={open}
    onClose={onClose}
    disableEscapeKeyDown
    onBackdropClick={(e) => e.stopPropagation()}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 700,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          minWidth: 300,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Crear nuevo registro
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: 300 }}
                fullWidth
                label="Fecha Límite de Edad"
                type="date"
                name="fechaLimiteEdad"
                value={formik.values.fechaLimiteEdad}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fechaLimiteEdad && Boolean(formik.errors.fechaLimiteEdad)}
                helperText={formik.touched.fechaLimiteEdad && formik.errors.fechaLimiteEdad}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
              sx={{ width: 300 }}
                fullWidth
                label="Fecha Límite de Apertura"
                type="date"
                name="fechaLimiteApertura"
                value={formik.values.fechaLimiteApertura}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fechaLimiteApertura &&
                  Boolean(formik.errors.fechaLimiteApertura)
                }
                helperText={
                  formik.touched.fechaLimiteApertura && formik.errors.fechaLimiteApertura
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" gutterBottom>
                Rango de Edad
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  
                  <Typography gutterBottom variant="body2">
                    Edad Mínima: {formik.values.edadMin} años
                  </Typography>
                  <Slider
                  sx={{ width: 500 }}
                    name="edadMin"
                    value={formik.values.edadMin}
                    onChange={(_, val) => formik.setFieldValue('edadMin', val)}
                    min={14}
                    max={24}
                    valueLabelDisplay="auto"
                  />
                  {formik.touched.edadMin && formik.errors.edadMin && (
                    <Typography color="error" variant="caption">
                      {formik.errors.edadMin}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography gutterBottom variant="body2">
                    Edad Máxima: {formik.values.edadMax} años
                  </Typography>
                  <Slider
                  sx={{ width: 500 }}
                    name="edadMax"
                    value={formik.values.edadMax}
                    onChange={(_, val) => formik.setFieldValue('edadMax', val)}
                    min={14}
                    max={24}
                    valueLabelDisplay="auto"
                  />
                  {formik.touched.edadMax && formik.errors.edadMax && (
                    <Typography color="error" variant="caption">
                      {formik.errors.edadMax}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
              sx={{ width: 300 }}
                select
                fullWidth
                label="Gestión"
                name="gestion"
                value={formik.values.gestion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.gestion && Boolean(formik.errors.gestion)}
                helperText={formik.touched.gestion && formik.errors.gestion}
              >
                <MenuItem value="2025">2025</MenuItem>
                <MenuItem value="2026">2026</MenuItem>
                <MenuItem value="2027">2027</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
              sx={{ width: 300 }}
                type="number"
                fullWidth
                label="Cantidad de Estudiantes"
                name="cantidadEstudiantes"
                value={formik.values.cantidadEstudiantes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.cantidadEstudiantes &&
                  Boolean(formik.errors.cantidadEstudiantes)
                }
                helperText={
                  formik.touched.cantidadEstudiantes && formik.errors.cantidadEstudiantes
                }
              />
            </Grid>
          </Grid>

          <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <Button
            onClick={() => {
              formik.resetForm(); // ← restablece los valores
              onClose();          // ← cierra el modal
            }}
            variant="outlined"
          >
            Cancelar
          </Button>
            <Button type="submit" variant="contained" color="primary">
              Asignar
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
