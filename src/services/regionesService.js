import api from './axiosConfig';
// REGIONES MILITARES
export const obtenerRegiones = () => api.get('/gestion/division/2025');
export const crearRegion = (data) => api.post('/regiones', data);
export const actualizarRegion = (id, data) => api.put(`/regiones/${id}`, data);
export const eliminarRegion = (id) => api.delete(`/regiones/${id}`);