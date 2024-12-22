import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientHomeComponent } from './client-home/client-home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import {ScreenService} from "./screen.service";
import { HttpClientModule } from '@angular/common/http';
import { ImageInputComponent } from './image-input/image-input.component';


@NgModule({
  declarations: [
    ClientHomeComponent,
    ImageInputComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers:[
    ScreenService
  ]
})
export class ClientModule { }
