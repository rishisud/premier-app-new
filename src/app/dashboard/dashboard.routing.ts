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
import { UserListComponent } from './user-list/user-list.component';
import { RoleGuard } from '../authguard/role.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { WorkOrderDetailsComponent } from './work-order-details/work-order-details.component';
import { WorkOrderListComponent } from './work-order-list/work-order-list.component';
import { HomeComponent } from '../online/home/home.component';
import { VideoRoomComponent } from '../online/video-room/video-room.component';

const routes: Routes = [

      { path: '', component: LoginComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      {
        path: 'dashboard',
        component: DashboardComponent, canActivate: [AuthGuard]
      },
      /*{
        path: 'device',
        component: DeviceComponent, canActivate: [AuthGuard]
      },*/
      {
        path: 'scanner',
        component: ScannerComponent, canActivate: [AuthGuard]
      },
      {
        path: 'video-call',
        component: VideoCallComponent, canActivate: [AuthGuard]
      },
      {
        path: 'user-list',
        component: UserListComponent, canActivate: [AuthGuard,RoleGuard]
      },
      {
        path: 'user-details',
        component: UserDetailsComponent, canActivate: [AuthGuard,RoleGuard]
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent, canActivate: [AuthGuard]
      },
      {
        path: 'work-order-details',
        component: WorkOrderDetailsComponent, canActivate: [AuthGuard,RoleGuard]
      },
      /*{
        path: 'work-order-list',
        component: WorkOrderListComponent, canActivate: [AuthGuard,RoleGuard]
      },*/
     // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      //{ path: 'online', component: VideoRoomComponent, canActivate: [AuthGuard] },
      {
        path: 'device-interrogation/:device/:requestid/:company/:date',
        component: DeviceInterrogationComponent, canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutes { }
