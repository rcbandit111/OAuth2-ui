import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements ControlValueAccessor {

  @Input() placeholder = 'Date';

  datePipeFormat = 'yyyy-MM-dd HH:mm:ss';

  options = {
    singleDatePicker: true,
    timePicker: true,
    timePicker24Hour: true,
    timePickerSeconds: true,
    autoUpdateInput: false,
    locale: {
      format: 'YYYY-MM-DD HH:mm:ss'
    }
  };

  private _value: any = null;

  set value(newValue: any) {
    this._value = newValue;
    this.onChange(this._value);
  }

  get value(): any {
    return this._value;
  }

  dateSelected(value: any): void {
    this.value = value.end.toDate();
  }

  onChange = (newValue: any) => {};

  onTouched = (newValue: any) => {};

  writeValue(newValue: any) {
    this.value = newValue;
  }

  registerOnChange(callback: (newValue: any) => void) {
    this.onChange = callback;
  }

  registerOnTouched(callback: () => void) {
    this.onTouched = callback;
  }
}
