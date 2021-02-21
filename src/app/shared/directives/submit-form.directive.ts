import {Directive, HostListener} from '@angular/core';
import {ControlContainer, FormControl, FormGroup, FormGroupDirective} from '@angular/forms';

@Directive({
  /* tslint:disable */
  selector: 'form[formGroup]'
  /* tslint:enable */
})
export class SubmitFormDirective {
  @HostListener('submit')
  private _onSubmit() {
    if ((<FormGroupDirective>this._formControl).submitted) {
      this._markAsTouched((<FormGroupDirective>this._formControl).control);
      (<FormGroupDirective>this._formControl).control.updateValueAndValidity({emitEvent: true});
    }
  }

  constructor(private _formControl: ControlContainer) {}

  private _markAsTouched(formGroup: FormGroup): void {
    Object.values((<FormGroup>formGroup).controls).forEach((control: FormControl | FormGroup) => {
      if (control instanceof FormGroup) {
        this._markAsTouched(control);
      } else {
        control.markAsTouched();
        control.updateValueAndValidity({emitEvent: true});
      }
    });
  }
}
