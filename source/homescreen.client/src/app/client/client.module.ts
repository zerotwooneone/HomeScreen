import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientHomeComponent } from './client-home/client-home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {ScreenService} from "./screen.service";
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ClientHomeComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
  ],
  providers:[
    ScreenService
  ]
})
export class ClientModule { }
