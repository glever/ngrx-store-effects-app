import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { tap, filter, take, switchMap, catchError } from "rxjs/operators";

import * as fromStore from "../store";
import { of } from "rxjs/observable/of";

@Injectable()
export class ToppingsGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getToppingsLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadToppings());
        }
      }),
      // this blocks stream until loaded is true
      filter(loaded => loaded),
      //  take() is just needed to complete stream (always return true)
      take(1)
    );
  }
}
