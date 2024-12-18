import { Component, signal } from '@angular/core';
import { Subject, finalize, map, merge, of, take, timeout} from 'rxjs';

@Component({
  selector: 'zh-client-home',
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss'
})
export class ClientHomeComponent {
  imageUrl = "";
  private readonly imgErrorSubject = new Subject<Event>();
  private readonly imgLoadSubject = new Subject<Event>();
  url="";
  sendDisabled = signal(false);

  onImgError(event: Event) {
    this.imgErrorSubject.next(event);
  }

  onImgLoad(event: Event) {
    this.imgLoadSubject.next(event);
  }

  sendClick(event: MouseEvent) {
    if(!this.url.trim()){
      return;
    }
    this.imageUrl ="";
    this.sendDisabled.set(true);
    const loaded = merge(
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
        }),
        finalize(()=>this.sendDisabled.set(false))
    ).subscribe(success=>{
      if(success){
        this.url="";
      }
      this.imageUrl="";
    });

    this.imageUrl = this.url;
  }
}
