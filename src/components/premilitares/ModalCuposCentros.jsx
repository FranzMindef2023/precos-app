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

export default function ModalCuposCentros({ open, onClose }) {
  const today = new Date().toISOString().split('T')[0];

  const validationSchema = Yup.object({
      cupos: Yup.number()
      .min(1, 'Debe ser al menos 1')
      .required('Campo requerido'),
      cuporegion: Yup.number()
      .min(1, 'Debe ser al menos 1')
      .required('Campo requerido'),
      cuposdisponibles: Yup.number()
      .min(1, 'Debe ser al menos 1')
      .required('Campo requerido'),
    idcentrosdereclutamiento: Yup.object()
      .nullable()
      .required('Seleccione una película'),
      idregion: Yup.object()
            .nullable()
            .required('Seleccione una película'),
  });

  const formik = useFormik({
    initialValues: {
      cupos: 0,
      idcentrosdereclutamiento: null,
      idregion:null,
      cuporegion:0,
      cuposdisponibles:0,
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
          maxWidth: 600,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
        Asignación de Cupos a Centros de Reclutamiento
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
            <Autocomplete
              sx={{ width: 500 }}
              fullWidth
              options={top100Films}
              getOptionLabel={(option) => option.title}
              value={formik.values.idregion}
              onChange={(_, value) => formik.setFieldValue('idregion', value)}
              onBlur={() => formik.setFieldTouched('idregion', true)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Region Militar"
                  margin="normal"
                  name="idregion"
                  error={formik.touched.idregion && Boolean(formik.errors.idregion)}
                  helperText={formik.touched.idregion && formik.errors.idregion}
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
              sx={{ width: 240 }}
              aria-readonly
                type="number"
                fullWidth
                label="Cupos Region"
                name="cuporegion"
                value={formik.values.cuporegion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.cuporegion &&
                  Boolean(formik.errors.cuporegion)
                }
                helperText={
                  formik.touched.cuporegion && formik.errors.cuporegion
                }
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
              sx={{ width: 240 }}
                type="number"
                fullWidth
                label="Cupos a Disponibles"
                name="cuposdisponibles"
                value={formik.values.cuposdisponibles}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.cuposdisponibles &&
                  Boolean(formik.errors.cuposdisponibles)
                }
                helperText={
                  formik.touched.cuposdisponibles && formik.errors.cuposdisponibles
                }
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
            <Autocomplete
              sx={{ width: 500 }}
              fullWidth
              options={top100Films}
              getOptionLabel={(option) => option.title}
              value={formik.values.idcentrosdereclutamiento}
              onChange={(_, value) => formik.setFieldValue('idcentrosdereclutamiento', value)}
              onBlur={() => formik.setFieldTouched('idcentrosdereclutamiento', true)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Centro de Reclutamiento"
                  margin="normal"
                  name="idcentrosdereclutamiento"
                  error={formik.touched.idcentrosdereclutamiento && Boolean(formik.errors.idcentrosdereclutamiento)}
                  helperText={formik.touched.idcentrosdereclutamiento && formik.errors.idcentrosdereclutamiento}
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
              sx={{ width: 500 }}
                type="number"
                fullWidth
                label="Cupos a Asignar"
                name="cupos"
                value={formik.values.cupos}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.cupos &&
                  Boolean(formik.errors.cupos)
                }
                helperText={
                  formik.touched.cupos && formik.errors.cupos
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