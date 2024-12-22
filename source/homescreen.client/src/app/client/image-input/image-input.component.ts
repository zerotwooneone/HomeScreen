import {Component, input, OnInit, signal} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, merge, of, Subject, take, timeout } from 'rxjs';

@Component({
  selector: 'zh-image-input',
  templateUrl: './image-input.component.html',
  styleUrl: './image-input.component.scss'
})
export class ImageInputComponent implements OnInit {
   control= input.required<FormControl>();
   timeoutMs = input(5000);
   imageUrl = '';
   private readonly imgErrorSubject = new Subject<Event>();
   private readonly imgLoadSubject = new Subject<Event>();
   private readonly imgAbortSubject = new Subject<Event>();
  imgVisible = signal<boolean>(false);

  constructor() {
  }

  ngOnInit(): void {
    this.control().valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value=>{
        if(!value?.trim()){
          return;
        }
        this.imageUrl ="";
        this.imgVisible.set(false);
        merge(
          this.imgErrorSubject.pipe(
            take(1),
            map(()=>false)),
          this.imgLoadSubject.pipe(
            take(1),
            map(()=>true)),
          this.imgAbortSubject.pipe(
            take(1),
            map(()=>false))
        ).pipe(
          take(1),
          timeout({
            first: this.timeoutMs(),
            with: ()=>of(false)
          })
        ).subscribe(success=>{
          this.imgVisible.set(success);
        });
        this.imageUrl = value;
    });
  }

  onImgError(event: Event) {
    this.imgErrorSubject.next(event);
  }

  onImgLoad(event: Event) {
    this.imgLoadSubject.next(event);
  }

  onImgAbort(event: Event) {
    this.imgAbortSubject.next(event);
  }

}
