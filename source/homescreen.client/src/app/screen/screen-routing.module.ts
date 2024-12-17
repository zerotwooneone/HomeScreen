import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScreenHomeComponent} from "./screen-home/screen-home.component";
import {localhostGuard} from "./localhost.guard";

const routes: Routes = [
  {
    path:'screen',
    component: ScreenHomeComponent,
    title: 'screen',
    canActivate: [localhostGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations:[ScreenHomeComponent],
  exports: [RouterModule]
})
export class ScreenRoutingModule { }
