import { Observable } from "rxjs";
import {ObservableProperty} from "../app/screen/ObservableProperty";

export {}; //this file needs to be a module

Observable.prototype.toObservableProperty =
  function<T>(this: Observable<T>, initialValue: T): ObservableProperty<T> {
    return new ObservableProperty<T>(initialValue);
  }

