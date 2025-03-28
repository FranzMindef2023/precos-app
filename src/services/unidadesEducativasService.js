// CENTROS EDUCATIVOS
export const obtenerUnidades = () => api.get('/unidades-educativas');
export const crearUnidadEducativa = (data) => api.post('/unidades-educativas', data);
export const actualizarUnidadEducativa = (id, data) => api.put(`/unidades-educativas/${id}`, data);
export const eliminarUnidadEducativa = (id) => api.delete(`/unidades-educativas/${id}`);