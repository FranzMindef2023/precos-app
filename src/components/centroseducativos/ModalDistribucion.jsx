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
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


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

export default function ModalDistribucion({ open, onClose }) {
  const today = new Date().toISOString().split('T')[0];
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;


  const validationSchema = Yup.object({
    centro: Yup.number()
          .min(1, 'Debe ser al menos 1')
          .required('Campo requerido'),
    departamento: Yup.array()
    .min(1, 'Debe seleccionar al menos una región')
    .required('Campo requerido'),
    regiones: Yup.array()
      .min(1, 'Debe seleccionar al menos una región')
      .required('Campo requerido'),
  });

  const formik = useFormik({
    initialValues: {
      departamento: [],
      centro: [],
      regiones: [],
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
          Distribución de Centros Educativos
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
            <Autocomplete
              sx={{ width: 600 }}
              fullWidth
              options={top100Films}
              getOptionLabel={(option) => option.title}
              value={formik.values.departamento}
              onChange={(_, value) => formik.setFieldValue('departamento', value)}
              onBlur={() => formik.setFieldTouched('departamento', true)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Película Favorita"
                  margin="normal"
                  name="departamento"
                  error={formik.touched.departamento && Boolean(formik.errors.departamento)}
                  helperText={formik.touched.departamento && formik.errors.departamento}
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
            <Autocomplete
              sx={{ width: 600 }}
              fullWidth
              options={top100Films}
              getOptionLabel={(option) => option.title}
              value={formik.values.centro}
              onChange={(_, value) => formik.setFieldValue('centro', value)}
              onBlur={() => formik.setFieldTouched('centro', true)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Película Favorita"
                  margin="normal"
                  name="centro"
                  error={formik.touched.centro && Boolean(formik.errors.centro)}
                  helperText={formik.touched.centro && formik.errors.centro}
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
              <Autocomplete
                sx={{ width: 600 }}
                multiple
                options={top100Films}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                value={formik.values.regiones}
                onChange={(_, value) => formik.setFieldValue('regiones', value)}
                onBlur={() => formik.setFieldTouched('regiones', true)}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.title}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Regiones"
                    placeholder="Seleccione una o más"
                    margin="normal"
                    error={formik.touched.regiones && Boolean(formik.errors.regiones)}
                    helperText={formik.touched.regiones && formik.errors.regiones}
                  />
                )}
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