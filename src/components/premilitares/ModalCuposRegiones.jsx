// src/components/premilitares/ModalCuposRegiones.jsx

import React,{useEffect,useState} from 'react';
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
import {
  obtenerRegiones
} from '../../services/regionesService';

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
  const [regiones, setRegiones] = useState([]);
  const today = new Date().toISOString().split('T')[0];
  useEffect(() => {
    const fetchRegiones = async () => {
      try {
        const response = await obtenerRegiones();
        console.log(response.data.data);
        setRegiones(response.data.data); // ajusta si la data viene anidada
      } catch (error) {
        console.error('Error al obtener regiones:', error);
      }
    };
  
    fetchRegiones();
  }, []);

  const validationSchema = Yup.object({
    cantidadCentros: Yup.number()
      .min(1, 'Debe ser al menos 1')
      .required('Campo requerido'),
      cupos: Yup.number()
      .min(1, 'Debe ser al menos 1')
      .required('Campo requerido'),
    idregion: Yup.object()
      .nullable()
      .required('Seleccione una película'),
  });

  const formik = useFormik({
    initialValues: {
      cupos: 0,
      cantidadCentros: 0,
      idregion: null,
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
          Asignación de Cupos a Regiones
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
            <Autocomplete
              sx={{ width: 500 }}
              fullWidth
              options={regiones}
              getOptionLabel={(option) => option.division || ''} // Mostrar el nombre correcto
              value={formik.values.idregion}
              onChange={(_, value) => formik.setFieldValue('idregion', value)}
              onBlur={() => formik.setFieldTouched('idregion', true)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Región Militar"
                  margin="normal"
                  name="idregion"
                  error={formik.touched.idregion && Boolean(formik.errors.idregion)}
                  helperText={formik.touched.idregion && formik.errors.idregion}
                />
              )}
              renderOption={(props, option, { inputValue }) => {
                const matches = match(option.division, inputValue, { insideWords: true });
                const parts = parse(option.division, matches);

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
              aria-readonly
                type="number"
                fullWidth
                label="Cantidad de Centros de Reclutamiento"
                name="cantidadCentros"
                value={formik.values.cantidadCentros}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.cantidadCentros &&
                  Boolean(formik.errors.cantidadCentros)
                }
                helperText={
                  formik.touched.cantidadCentros && formik.errors.cantidadCentros
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
              sx={{ width: 300 }}
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