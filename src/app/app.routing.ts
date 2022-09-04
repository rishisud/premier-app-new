import { Routes } from '@angular/router';
import { LoginComponent } from './dashboard/login/login.component';

import { FullComponent } from './layouts/full/full.component';
import { VideoRoomComponent } from './online/video-room/video-room.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  {
    path: 'online',
    component: VideoRoomComponent,
  }
];
