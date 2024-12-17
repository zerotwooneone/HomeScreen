import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScreenHomeComponent} from "./screen-home/screen-home.component";

const routes: Routes = [
  {
    path:'screen',
    component: ScreenHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations:[ScreenHomeComponent],
  exports: [RouterModule]
})
export class ScreenRoutingModule { }
