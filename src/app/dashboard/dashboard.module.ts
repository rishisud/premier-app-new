import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardRoutes } from './dashboard.routing';
import { ScannerComponent } from './scanner/scanner.component';
import { DashboardComponent } from './dashboard.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { DeviceInterrogationComponent } from './device-interrogation/device-interrogation.component';
import { DeviceComponent } from './device/device.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { UserListComponent } from './user-list/user-list.component';
import { WorkOrderListComponent } from './work-order-list/work-order-list.component';
import { WorkOrderDetailsComponent } from './work-order-details/work-order-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    DashboardRoutes,
    SharedModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  declarations: [LoginComponent, DashboardComponent, ScannerComponent, VideoCallComponent, DeviceInterrogationComponent, DeviceComponent, UserListComponent, WorkOrderListComponent, WorkOrderDetailsComponent, UserDetailsComponent, ChangePasswordComponent]
})
export class DashboardModule {}
