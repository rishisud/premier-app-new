import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { DashboardComponent } from './dashboard.component';
import { DeviceInterrogationComponent } from './device-interrogation/device-interrogation.component';
import { DeviceComponent } from './device/device.component';
import { ScannerComponent } from './scanner/scanner.component';
import { VideoCallComponent } from './video-call/video-call.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'device',
        component: DeviceComponent
      },
      {
        path: 'scanner',
        component: ScannerComponent
      },
      {
        path: 'video-call',
        component: VideoCallComponent
      },
      {
        path: 'device-interrogation/:device',
        component: DeviceInterrogationComponent
      }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutes { }
