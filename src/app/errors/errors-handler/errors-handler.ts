
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(
    private zone: NgZone,
    private injector: Injector
  ) { }

  handleError(error: Error | HttpErrorResponse) {
    const router = this.injector.get(Router);
    console.error(error);
    this.zone.run(() => { router.navigate(['panel', 'error']); });
  }
}

