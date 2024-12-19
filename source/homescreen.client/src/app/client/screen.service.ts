import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable()
export class ScreenService {

  constructor(private readonly httpClient:HttpClient) { }

  public SetImage(url:string): Observable<any>{
    return this.httpClient
      .post('/api/Screen',{url:url}, {headers: {'Content-Type': 'application/json' }})
      .pipe(shareReplay(1))
  }
}
