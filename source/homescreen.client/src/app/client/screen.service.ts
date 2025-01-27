import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, shareReplay, throwError} from 'rxjs';

@Injectable()
export class ScreenService {

  constructor(private readonly httpClient:HttpClient) { }

  public SetImageUrl(url:string): Observable<any>{
    return this.httpClient
      .post('/api/Screen',{url:url}, {headers: {'Content-Type': 'application/json' }})
      .pipe(shareReplay(1))
  }
  public SetImageData(data:{slideShow:string[]}): Observable<any>{
    if(!data?.slideShow?.length) {
      return throwError(() => new Error('No slideshow provided'));
    }
    return this.httpClient
      .post('/api/Screen',{slideShow:data.slideShow}, {headers: {'Content-Type': 'application/json' }})
      .pipe(shareReplay(1))
  }
}
