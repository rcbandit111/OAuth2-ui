import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

export interface RangeSlidePickerOptions {
  min?: number;
  max?: number;
  from?: number;
  to?: number;
  disabled?: boolean;
  type?: string;
  step?: number;
  grid?: boolean;
  minInterval?: number;
  maxInterval?: number;
  dragInterval?: number;
  values?: number[] | string[];
}

@Component({
  selector: 'app-range-slide-picker',
  templateUrl: './range-slide-picker.component.html',
  styleUrls: ['./range-slide-picker.component.scss']
})
export class RangeSlidePickerComponent implements AfterViewInit {

  @ViewChild('inputElem') inputElem: ElementRef<HTMLInputElement>;
  @Input() options: RangeSlidePickerOptions;
  @Output() valueChanges: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngAfterViewInit() {
    this.initSlider();
  }

  initSlider() {
    (jQuery(this.inputElem.nativeElement) as any).ionRangeSlider({
      min: this.options.min,
      max: this.options.max,
      from: this.options.from,
      to: this.options.to,
      disable: this.toBoolean(this.options.disabled),
      type: this.options.type,
      step: this.options.step,
      min_interval: this.options.minInterval,
      max_interval: this.options.maxInterval,
      drag_interval: this.options.dragInterval,
      grid: this.options.grid,
      values: this.options.values,

      onStart: () => {
        // this.onStart.emit(this.buildCallback());
      },
      onChange:  (a) => {
        this.updateInternalValues(a);
        // this.onChange.emit(this.buildCallback());
      },
      onFinish: () => {
        // this.onFinish.emit(this.buildCallback());
      },
      onUpdate:  () => {
        // this.onUpdate.emit(this.buildCallback());
      }
    });
  }

  toBoolean(value: any) {
    if (value && typeof value === 'string') {
      return value.toLowerCase() !== 'false';
    } else {
      return value;
    }
  }

  updateInternalValues(data) {
    this.options.min = data.min;
    this.options.max = data.max;
    this.options.from = data.from;
    this.options.to = data.to;

    this.valueChanges.emit({from: data.from_value, to: data.to_value});
  }

  buildCallback() {
    return this.options;
  }

}
