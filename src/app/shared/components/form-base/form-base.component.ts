import { Component } from '@angular/core';
import { isNull, isUndefined } from 'util';
import { FormGroup } from '@angular/forms';
import { FORM_ERRORS } from '@utils/form.errors';

@Component({
  selector: 'app-form-base',
  template: ``
})
export class FormBaseComponent {
  formGroup: FormGroup = new FormGroup({});
  formErrors = null;
  submitCount = 0;
  loading = false;

  constructor() { }

  controlHasErrors(controlName: string, formGroup?: FormGroup): boolean {
    const form = formGroup || this.formGroup;
    return form.get(controlName).errors !== null
      && form.get(controlName).touched;
  }

  controlValidateMessage(controlName: string, formGroup?: FormGroup): string {
    const form = formGroup || this.formGroup;
    const errors = form.get(controlName).errors;
    let mess = '';

    for (const errorName in errors) {
      if (errors.hasOwnProperty(errorName)) {
        if (!isNull(this.formErrors) && !isUndefined(this.formErrors[errorName])) {
          mess = this.formErrors[errorName];
        } else {
          mess = FORM_ERRORS[errorName];
        }
      }
    }

    return mess;
  }

  errorClasses(controlName: string, formGroup?: FormGroup): { [name: string]: boolean } {
    const hasError = this.controlHasErrors(controlName, formGroup);
    return {
      'has-errors': hasError,
      'has-danger': hasError
    };
  }

  onSubmit() {
    ++this.submitCount;
    console.log(this.formGroup.value);
  }
}
