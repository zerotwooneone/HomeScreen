import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientHomeComponent } from './client-home/client-home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    ClientHomeComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MatFormFieldModule,
    MatButtonModule
  ]
})
export class ClientModule { }
