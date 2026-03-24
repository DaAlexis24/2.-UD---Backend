import { AboutPage } from '../../features/about/about';
import { Home } from '../../features/home/home';
import { ProductsPage } from '../../features/products/products';

export const routes = [
  {
    path: '/',
    label: 'Inicio',
    renderComponent: Home.render,
  },
  {
    path: '/products',
    label: 'Productos',
    renderComponent: ProductsPage.render,
  },
  {
    path: '/about',
    label: 'Sobre Nosotros',
    renderComponent: AboutPage.render,
  },
];

export const navigate = (url = '', addHistory = true) => {
  console.log('URL for navigate', url);
  console.log(history.state);

  if (history.state?.url === url) {
    return;
  }

  if (addHistory) {
    history.pushState({ url }, '', url);
  }
  const path = url.split('/').pop() as string;
  const route = routes.find((o) => o.path === '/' + path);

  if (route) {
    route.renderComponent();
  }
};
