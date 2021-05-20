import { Routes, RouterModule } from '@angular/router';
import { OrderInputRoutes } from './components/order-input/order-input.routes';

export const routes: Routes = [
  ...OrderInputRoutes,
];
export const routing = RouterModule.forRoot(routes, { useHash: true });
