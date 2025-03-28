import api from './axiosConfig';

// CUPOS
export const asignarCupos = (data) => api.post('/cupos/aperturas', data);
export const obtenerCupos = () => api.get('/gestion/division/2025');
export const obtenerCuposPorCentro = (centroId) => api.get(`/cupos/centro/${centroId}`);