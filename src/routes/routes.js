import DistribucionCuposPage from '../pages/DistribucionCuposPage';
import CentrosEducativosPage from '../pages/CentrosEducativosPage';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';

const routes = [
  {
    path: '/login',
    component: LoginPage,
    isPublic: true,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/apertura-de-cupos',
    component: DistribucionCuposPage,
  },
  {
    path: '/centros-educativos',
    component: CentrosEducativosPage,
  },
];

export default routes;
