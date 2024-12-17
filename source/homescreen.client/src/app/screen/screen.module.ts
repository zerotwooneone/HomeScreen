import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenRoutingModule } from './screen-routing.module';
import {ScreenHubService} from "./screen-hub.service";
import {ScreenHomeComponent} from "./screen-home/screen-home.component";

@NgModule({
  imports: [
    CommonModule,
    ScreenRoutingModule
  ],
  providers:[ScreenHubService]
})
export class ScreenModule { }
