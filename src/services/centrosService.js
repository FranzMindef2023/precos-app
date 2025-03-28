// CENTROS DE RECLUTAMIENTO
export const obtenerCentros = () => api.get('/centros');
export const crearCentro = (data) => api.post('/centros', data);
export const actualizarCentro = (id, data) => api.put(`/centros/${id}`, data);
export const eliminarCentro = (id) => api.delete(`/centros/${id}`);