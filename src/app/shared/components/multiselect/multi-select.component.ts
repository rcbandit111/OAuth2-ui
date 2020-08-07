import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {isNull} from 'util';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'app-multiselect',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    }
  ]
})
export class MultiSelectComponent implements ControlValueAccessor, OnInit {

  @Input() data: {id: any, text: string}[] = null;
  @Input() options: Select2Options = null;
  @Input() disabled = false;

  private _value: any[] = null;

  set value(newValue: any[]) {
    if (Array.isArray(newValue) && newValue.length > 0) {
      this._value = newValue;
    } else {
      this._value = null;
    }
    this.onChange(this._value);
  }

  get value(): any[] {
    return this._value;
  }

  selectOptions: Select2Options = {
    dropdownAutoWidth: true,
    multiple: true,
    width: '100%'
  };

  ngOnInit() {
    if (!isNull(this.options)) {
      this.selectOptions = this.options;
    }
  }

  selectChanged(result: any): void {
    this.value = result.value;
  }

  onChange = (newValue: any[]) => {};

  onTouched = (newValue: any[]) => {};

  writeValue(newValue: any[]) {
    this.value = newValue;
  }

  registerOnChange(callback: (newValue: any[]) => void) {
    this.onChange = callback;
  }

  registerOnTouched(callback: () => void) {
    this.onTouched = callback;
  }
}
