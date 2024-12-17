import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScreenHomeComponent} from "./screen-home/screen-home.component";
import {localhostGuard} from "./localhost.guard";
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path:'screen',
    component: ScreenHomeComponent,
    title: 'screen',
    canActivate: [localhostGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [RouterModule],
  declarations: [ScreenHomeComponent ]
})
export class ScreenRoutingModule { }
