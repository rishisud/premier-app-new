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

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    DashboardRoutes
  ],
  declarations: [DashboardComponent, ScannerComponent, VideoCallComponent, DeviceInterrogationComponent, DeviceComponent]
})
export class DashboardModule {}
