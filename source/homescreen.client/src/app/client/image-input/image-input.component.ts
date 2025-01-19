import {Component, input, model, OnInit, signal} from '@angular/core';
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
  imageSource = model('')
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
      .subscribe(async value=>{
        if(!value?.trim()){
          return;
        }
        this.imageSource.set('');
        this.imgVisible.set(false);
        const sanitizedValue = value.trim();
        const dataUrl = await this.getBase64Image(sanitizedValue);

        //todo: fix issue with pasting image url
        const timeoutMs = this.timeoutMs()<0
          ? 1
          : this.timeoutMs();

        let imageLoadSuccess = merge(
          this.imgErrorSubject.pipe(
            map(()=> {
              console.warn('image failed to load');
              return false;
            })),
          this.imgLoadSubject.pipe(
            map(()=> {
              return true;
            })),
          this.imgAbortSubject.pipe(
            map(()=>{
              console.warn('image load abort');
              return false;
            }))
        ).pipe(
          take(1),
          timeout({
            first: timeoutMs,
            with: ()=>of(false)
          })
        );
        this.imgStatus.next(imageLoadSuccess);
        imageLoadSuccess.subscribe(success=>{
          this.imgVisible.set(success);
        });

        this.imageSource.set(dataUrl);
    });
  }

  getBase64Image(imageUrl: string): Promise<string> {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Important for CORS

    const result = new Promise<string>((resolve, reject) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.height = img.naturalHeight;
        canvas.width = img.naturalWidth;
        ctx?.drawImage(img, 0, 0);

        // Compression options
        const quality = 0.7; // Adjust this value (0.0 - 1.0) for compression level
        const mimeType = 'image/jpeg'; // Use 'image/jpeg' for better compression

        try {
          resolve(canvas.toDataURL(mimeType, quality));
        } catch (error) {
          reject(error);
        }
      };
    });
    img.src = imageUrl;

    return result;
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
