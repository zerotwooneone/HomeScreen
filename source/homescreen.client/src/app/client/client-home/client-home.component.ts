import { Component, signal } from '@angular/core';
import { Subject, finalize, map, merge, of, take, timeout} from 'rxjs';
import {ScreenService} from "../screen.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'zh-client-home',
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss'
})
export class ClientHomeComponent {
  imageUrl = "";
  private readonly imgErrorSubject = new Subject<Event>();
  private readonly imgLoadSubject = new Subject<Event>();
  readonly sendDisabled = signal(false);
  imageForm: FormGroup;
  get urls() {
    return this.imageForm.get('urls') as FormArray;
  }
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly screenService: ScreenService) {
    const initialUrl = this.formBuilder.control('');
    initialUrl.valueChanges.subscribe(value=>{
      if(!value?.trim()){
        return;
      }
      this.imageUrl ="";
      merge(
        this.imgErrorSubject.pipe(
          take(1),
          map(()=>false)),
        this.imgLoadSubject.pipe(
          take(1),
          map(()=>true))
      ).pipe(
        take(1),
        timeout({
          first: 5000,
          with: ()=>of(false)
        })
      ).subscribe(success=>{
        //todo:handle success and failure
      });

      this.imageUrl = value;
    });
    this.imageForm = formBuilder.group({
      urls: this.formBuilder.array([
        initialUrl
      ])
    });
  }

  onImgError(event: Event) {
    this.imgErrorSubject.next(event);
  }

  onImgLoad(event: Event) {
    this.imgLoadSubject.next(event);
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
}
