import {Component, computed, signal} from '@angular/core';
import { finalize} from 'rxjs';
import {ScreenService} from "../screen.service";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'zh-client-home',
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss'
})
export class ClientHomeComponent {
  readonly sendDisabled = signal(false);
  imageForm: FormGroup;
  canDelete = computed<boolean>(()=>this.urls.length > 1);
  get urls() {
    return this.imageForm.get('urls') as FormArray;
  }
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly screenService: ScreenService) {
    const initialUrl = this.formBuilder.control('');
    this.imageForm = formBuilder.group({
      urls: this.formBuilder.array([
        initialUrl
      ])
    });
  }
  sendClick(event: MouseEvent) {
    const url = this.urls.at(0)?.value.trim();
    if(!this.imageForm.valid || !url){
      return;
    }
    this.sendDisabled.set(true);
    this.screenService
      .SetImage(url)
      .pipe(
        finalize(()=>this.sendDisabled.set(false))
      )
      .subscribe();
  }

  castFormControl(imageControl: AbstractControl) {
    return imageControl as FormControl;
  }

  deleteClick(controlIndex:number) {
    if(this.urls.length <=1){
      return;
    }
    this.urls.removeAt(controlIndex);
  }
}
