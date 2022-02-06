import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authguard/auth.guard';
import { LoginComponent } from './login/login.component';
import { FullComponent } from '../layouts/full/full.component';
import { DashboardComponent } from './dashboard.component';
import { DeviceInterrogationComponent } from './device-interrogation/device-interrogation.component';
import { DeviceComponent } from './device/device.component';
import { ScannerComponent } from './scanner/scanner.component';
import { VideoCallComponent } from './video-call/video-call.component';

const routes: Routes = [

      { path: '', component: LoginComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      {
        path: 'dashboard',
        component: DashboardComponent, canActivate: [AuthGuard]
      },
      {
        path: 'device',
        component: DeviceComponent, canActivate: [AuthGuard]
      },
      {
        path: 'scanner',
        component: ScannerComponent, canActivate: [AuthGuard]
      },
      {
        path: 'video-call',
        component: VideoCallComponent, canActivate: [AuthGuard]
      },
      {
        path: 'device-interrogation/:device/:requestid',
        component: DeviceInterrogationComponent, canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutes { }
