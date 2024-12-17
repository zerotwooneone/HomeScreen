import {BehaviorSubject, Observable, distinctUntilChanged, shareReplay, startWith } from "rxjs";

export class ObservableProperty<T> {
  private readonly _subject: BehaviorSubject<T>;
  private readonly _observable: Observable<T>;

  public get Value$(): Observable<T> {
    return this._observable;
  }
  public get Value(): T {
    return this._subject?.value;
  }
  public set Value(value: T) {
    this._subject?.next(value);
  }

  constructor(initialValue: T, observable?: Observable<T>) {
    this._subject =  new BehaviorSubject(initialValue);
    if(observable){
      observable.subscribe(v=>this._subject.next(v));
    }
    this._observable = this._subject.pipe(
      distinctUntilChanged());
  }
}

