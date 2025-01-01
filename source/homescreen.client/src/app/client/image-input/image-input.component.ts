import {Component, input, OnInit, signal} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {BehaviorSubject, debounceTime, first,
  firstValueFrom, map, merge, Observable, of, shareReplay, Subject, switchMap, take, timeout } from 'rxjs';

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
  imgStatus = new BehaviorSubject<Observable<boolean>>(new BehaviorSubject(false));

  constructor() {
  }

  ngOnInit(): void {
    this.control().addAsyncValidators([
      (control: AbstractControl) => {
        return firstValueFrom(this.imgStatus.pipe(
          switchMap(obs=>obs),
          map(status=>
            status
              ? null
              : {'imageFailedToLoad': true})
        ));
      }
    ])
    this.control().valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value=>{
        if(!value?.trim()){
          return;
        }
        const timeoutMs = this.timeoutMs()<0
          ? 1
          : this.timeoutMs();

        this.imageUrl ="";
        this.imgVisible.set(false);
        let imageLoadSuccess = merge(
          this.imgErrorSubject.pipe(
            map(()=> false)),
          this.imgLoadSubject.pipe(
            map(()=> true)),
          this.imgAbortSubject.pipe(
            map(()=>false))
        ).pipe(
          take(1),
          timeout({
            first: timeoutMs,
            with: ()=>of(false)
          })
          //,shareReplay(1)
        );
        this.imgStatus.next(imageLoadSuccess);
        imageLoadSuccess.subscribe(success=>{
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
