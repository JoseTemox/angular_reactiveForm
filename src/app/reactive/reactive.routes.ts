import { Routes } from '@angular/router';
import { BasicPageComponent } from './pages/basic-page/basic-page.component';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import { SwitchesComponent } from './pages/switches/switches.component';

export const reactiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Básicos',
        component: BasicPageComponent,
      },
      {
        path: 'dynamic',
        title: 'Dinámicos',
        component: DynamicPageComponent,
      },
      {
        path: 'switches',
        title: 'Switches',
        component: SwitchesComponent,
      },
      {
        path: '**',
        redirectTo: 'basic',
      },
    ],
  },
];

export default reactiveRoutes;
