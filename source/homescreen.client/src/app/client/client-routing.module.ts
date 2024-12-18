import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientHomeComponent} from "./client-home/client-home.component";

const routes: Routes = [
  {
    path:'client',
    title: "home screen",
    component: ClientHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
