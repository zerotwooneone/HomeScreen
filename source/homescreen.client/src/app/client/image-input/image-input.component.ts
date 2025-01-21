import {Component, input, model, OnInit, signal} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {BehaviorSubject, catchError, debounceTime, first,
  firstValueFrom, from, map, merge, Observable, of, shareReplay, Subject, switchMap, take, takeUntil, tap, timeout } from 'rxjs';

@Component({
  selector: 'zh-image-input',
  templateUrl: './image-input.component.html',
  styleUrl: './image-input.component.scss'
})
export class ImageInputComponent implements OnInit {
  control= input.required<FormControl>();
  imageSource = model('')
  imgVisible = signal<boolean>(true);
  private _imgSuccess = new Subject<boolean>();

  constructor() {
  }

  ngOnInit(): void {
    this.control().addAsyncValidators([
      (control: AbstractControl) => {
        const controlValue = control.value as string;

        this.imageSource.set('');
        const sanitizedValue = controlValue.trim();
        if(!sanitizedValue){
          return Promise.resolve(null);
        }

        const successObservable = this._imgSuccess.pipe(
          take(1),
          shareReplay(1),
        )

        this.imageSource.set(sanitizedValue);

        return firstValueFrom(successObservable.pipe(
          map(status=>
            status
              ? null
              : {'imageFailedToLoad': true})
        ));
      }
    ]);

  }

  onImgError(event: Event) {
    this._imgSuccess.next(false);
  }

  onImgLoad(event: Event) {
    this._imgSuccess.next(true);
  }

  onImgAbort(event: Event) {
    this._imgSuccess.next(false);
  }

}
