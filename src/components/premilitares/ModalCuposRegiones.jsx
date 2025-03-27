// src/components/premilitares/ModalCuposRegiones.jsx

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
  Autocomplete,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  // ... (puedes añadir más si lo deseas)
];

export default function ModalCuposRegiones({ open, onClose }) {
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
    peliculaFavorita: Yup.object()
      .nullable()
      .required('Seleccione una película'),
  });

  const formik = useFormik({
    initialValues: {
      fechaLimiteEdad: '',
      fechaLimiteApertura: today,
      edadMin: 16,
      edadMax: 17,
      gestion: '2025',
      cantidadEstudiantes: 0,
      peliculaFavorita: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Registro guardado:', values);
      onClose();
    },
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      disableEscapeKeyDown
      onBackdropClick={(e) => e.stopPropagation()}
    >
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
        }}
      >
        <Typography variant="h6" gutterBottom>
          Crear nuevo registro
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
            <Autocomplete
              sx={{ width: 500 }}
              fullWidth
              options={top100Films}
              getOptionLabel={(option) => option.title}
              value={formik.values.peliculaFavorita}
              onChange={(_, value) => formik.setFieldValue('peliculaFavorita', value)}
              onBlur={() => formik.setFieldTouched('peliculaFavorita', true)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Película Favorita"
                  margin="normal"
                  name="peliculaFavorita"
                  error={formik.touched.peliculaFavorita && Boolean(formik.errors.peliculaFavorita)}
                  helperText={formik.touched.peliculaFavorita && formik.errors.peliculaFavorita}
                />
              )}
              renderOption={(props, option, { inputValue }) => {
                const matches = match(option.title, inputValue, { insideWords: true });
                const parts = parse(option.title, matches);

                return (
                  <li {...props}>
                    {parts.map((part, index) => (
                      <span
                        key={index}
                        style={{
                          fontWeight: part.highlight ? 700 : 400,
                        }}
                      >
                        {part.text}
                      </span>
                    ))}
                  </li>
                );
              }}
            />
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
                formik.resetForm();
                onClose();
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