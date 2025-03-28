// src/routes.js
import PremilitaresPage from './pages/PremilitaresPage';
import CentrosEducativosPage from './pages/CentrosEducativosPage';


const routes = [
  {
    path: '/premilitares',
    component: PremilitaresPage,
  },
  {
    path: '/centros-educativos',
    component: CentrosEducativosPage,
  },
  // más rutas si tienes...
];

export default routes;
