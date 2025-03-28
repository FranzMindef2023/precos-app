// ESTUDIANTES
export const obtenerEstudiantes = () => api.get('/estudiantes');
export const obtenerEstudiantesPorUnidad = (unidadId) => api.get(`/estudiantes/unidad/${unidadId}`);
export const crearEstudiante = (data) => api.post('/estudiantes', data);
export const actualizarEstudiante = (id, data) => api.put(`/estudiantes/${id}`, data);
export const eliminarEstudiante = (id) => api.delete(`/estudiantes/${id}`);
