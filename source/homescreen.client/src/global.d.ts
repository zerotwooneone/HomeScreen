import {ObservableProperty} from "./app/screen/ObservableProperty";

export {}; //this needs to be a module
declare global {
  interface Observable<T> {
    toObservableProperty(initialValue: T): ObservableProperty<T>;
  }
}
