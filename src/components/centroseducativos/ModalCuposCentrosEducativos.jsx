import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Chip,
  Autocomplete,
  LinearProgress,
  Paper,
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
];

export default function ModalCuposCentrosEducativos({ open, onClose }) {
  const [errorAsignacion, setErrorAsignacion] = useState('');
  const [porcentajeHombres, setPorcentajeHombres] = useState(80);
  const [porcentajeMujeres, setPorcentajeMujeres] = useState(20);

  const totalEstudiantes = 29;
  const totalEstudiantesHabilitados = 15;
  const hombres = 4;
  const mujeres = 11;
  const cuposDisponibles = 996;

  const validationSchema = Yup.object({
    cupos: Yup.number().min(1, 'Debe ser al menos 1').required('Campo requerido'),
    idcentrosdereclutamiento: Yup.object().nullable().required('Seleccione un centro'),
    idregion: Yup.object().nullable().required('Seleccione una región'),
    idcentroeducativo: Yup.object().nullable().required('Seleccione un centro educativo'),
  });

  const formik = useFormik({
    initialValues: {
      cupos: 0,
      idcentrosdereclutamiento: null,
      idregion: null,
      idcentroeducativo: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const hombresAsignados = Math.floor((porcentajeHombres / 100) * values.cupos);
      const mujeresAsignadas = values.cupos - hombresAsignados;
      if (hombresAsignados > hombres || mujeresAsignadas > mujeres) {
        setErrorAsignacion('La asignacion excede la cantidad de estudiantes disponibles según género, o no existe unidad educativa');
        return;
      }
      setErrorAsignacion('');
      console.log('Registro guardado:', values);
      onClose();
    },
  });

  const hombresAsignados = Math.floor((porcentajeHombres / 100) * formik.values.cupos);
  const mujeresAsignadas = formik.values.cupos - hombresAsignados;

  return (
    <Modal open={open} onClose={onClose} disableEscapeKeyDown>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '95%', maxWidth: 600, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Asignación de Cupos a Centros Educativos
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Autocomplete
              sx={{ width: 500 }}
                options={top100Films}
                getOptionLabel={(option) => option.title}
                value={formik.values.idcentrosdereclutamiento}
                onChange={(_, value) => formik.setFieldValue('idcentrosdereclutamiento', value)}
                renderInput={(params) => <TextField {...params} label="Centro de Reclutamiento" />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
              sx={{ width: 500 }}
                options={top100Films}
                getOptionLabel={(option) => option.title}
                value={formik.values.idregion}
                onChange={(_, value) => formik.setFieldValue('idregion', value)}
                renderInput={(params) => <TextField {...params} label="Región Militar" />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
              sx={{ width: 500 }}
                options={top100Films}
                getOptionLabel={(option) => option.title}
                value={formik.values.idcentroeducativo}
                onChange={(_, value) => formik.setFieldValue('idcentroeducativo', value)}
                renderInput={(params) => <TextField {...params} label="Unidad Educativa" />}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: 500 }}>
              <Typography variant="subtitle1"><strong>Distribución Actual</strong></Typography>
              <Typography variant="body2">Total Estudiantes: {totalEstudiantes}</Typography>
              <Typography variant="body2">Total Estudiantes Habilitados:{totalEstudiantesHabilitados}</Typography>
              <Typography variant="body2">Hombres: {hombres}</Typography>
              <LinearProgress variant="determinate" value={(hombres / totalEstudiantes) * 100} sx={{ height: 10, mb: 1, bgcolor: '#d0e4ff' }} />
              <Typography variant="body2">Mujeres: {mujeres}</Typography>
              <LinearProgress variant="determinate" value={(mujeres / totalEstudiantes) * 100} sx={{ height: 10, bgcolor: '#f8cde5' }} />
              <Box mt={1} display="flex" alignItems="center" gap={1}>
                <Typography variant="body2">Cupos Disponibles:</Typography>
                <Chip label={cuposDisponibles} color="success" />
              </Box>
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
                error={formik.touched.cupos && Boolean(formik.errors.cupos)}
                helperText={formik.touched.cupos && formik.errors.cupos}
              />
              {errorAsignacion && (
                <Typography color="error" variant="body2">{errorAsignacion}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6"><strong>Distribución de Cupos por Género</strong></Typography>
              <Box display="flex" gap={2}>
                <TextField
                sx={{ width: 300 }}
                  label="Porcentaje Hombres"
                  type="number"
                  value={porcentajeHombres}
                  onChange={(e) => setPorcentajeHombres(Number(e.target.value))}
                  InputProps={{ endAdornment: <span>%</span> }}
                />
                <TextField
                sx={{ width: 200 }}
                  label="Porcentaje Mujeres"
                  type="number"
                  value={porcentajeMujeres}
                  onChange={(e) => setPorcentajeMujeres(Number(e.target.value))}
                  InputProps={{ endAdornment: <span>%</span> }}
                />
              </Box>
              <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
                <Typography variant="subtitle1">Distribución Sugerida:</Typography>
                <Typography color="primary">Cupos para Hombres: {hombresAsignados}</Typography>
                <Typography color="secondary">Cupos para Mujeres: {mujeresAsignadas}</Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={() => { formik.resetForm(); setErrorAsignacion(''); onClose(); }} variant="outlined">Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">Guardar Centro</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}