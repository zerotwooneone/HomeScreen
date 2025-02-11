import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenRoutingModule } from './screen-routing.module';
import {ScreenHubService} from "./screen-hub.service";

@NgModule({
  imports: [
    CommonModule,
    ScreenRoutingModule
  ],
  providers:[ScreenHubService]
})
export class ScreenModule { }
