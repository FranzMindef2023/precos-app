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
import {
  asignarCupos
} from '../../services/cuposService';

export default function ModalNuevoRegistro({ open, onClose }) {
  const today = new Date().toISOString().split('T')[0];

  const validationSchema = Yup.object({
    fecha_limite: Yup.date().required('Campo requerido'),
    fecha_apertura: Yup.date()
      .max(new Date(), 'No puede ser una fecha futura')
      .required('Campo requerido'),
    edad_min: Yup.number()
      .min(14)
      .max(24)
      .required()
      .test('edad_min < edad_max', 'Debe ser menor que la edad máxima', function (value) {
        return value < this.parent.edad_max;
      }),
    edad_max: Yup.number()
      .min(14)
      .max(24)
      .required()
      .test('edad_max > edad_min', 'Debe ser mayor que la edad mínima', function (value) {
        return value > this.parent.edad_min;
      }),
    gestion: Yup.string().required('Campo requerido'),
    cantidad: Yup.number()
      .min(1, 'Debe ser al menos 1')
      .required('Campo requerido'),
  });

  const formik = useFormik({
    initialValues: {
      fecha_limite: '',
      fecha_apertura: today,
      edad_min: 16,
      edad_max: 17,
      gestion: '2025',
      cantidad: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await asignarCupos(values);
      console.log('Registro guardado:', response);
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
                name="fecha_limite"
                value={formik.values.fecha_limite}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fecha_limite && Boolean(formik.errors.fecha_limite)}
                helperText={formik.touched.fecha_limite && formik.errors.fecha_limite}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
              sx={{ width: 300 }}
                fullWidth
                label="Fecha Límite de Apertura"
                type="date"
                name="fecha_apertura"
                value={formik.values.fecha_apertura}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fecha_apertura &&
                  Boolean(formik.errors.fecha_apertura)
                }
                helperText={
                  formik.touched.fecha_apertura && formik.errors.fecha_apertura
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
                    Edad Mínima: {formik.values.edad_min} años
                  </Typography>
                  <Slider
                  sx={{ width: 500 }}
                    name="edad_min"
                    value={formik.values.edad_min}
                    onChange={(_, val) => formik.setFieldValue('edad_min', val)}
                    min={14}
                    max={24}
                    valueLabelDisplay="auto"
                  />
                  {formik.touched.edad_min && formik.errors.edad_min && (
                    <Typography color="error" variant="caption">
                      {formik.errors.edad_min}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography gutterBottom variant="body2">
                    Edad Máxima: {formik.values.edad_max} años
                  </Typography>
                  <Slider
                  sx={{ width: 500 }}
                    name="edad_max"
                    value={formik.values.edad_max}
                    onChange={(_, val) => formik.setFieldValue('edad_max', val)}
                    min={14}
                    max={24}
                    valueLabelDisplay="auto"
                  />
                  {formik.touched.edad_max && formik.errors.edad_max && (
                    <Typography color="error" variant="caption">
                      {formik.errors.edad_max}
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
                name="cantidad"
                value={formik.values.cantidad}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.cantidad &&
                  Boolean(formik.errors.cantidad)
                }
                helperText={
                  formik.touched.cantidad && formik.errors.cantidad
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
