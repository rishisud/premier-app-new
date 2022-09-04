import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideoRoomComponent } from './video-room/video-room.component';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: ':roomName', component: VideoRoomComponent }
	];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineRoutingModule { }
