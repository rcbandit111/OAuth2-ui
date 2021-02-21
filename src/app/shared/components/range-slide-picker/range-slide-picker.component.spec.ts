/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RangeSlidePickerComponent } from './range-slide-picker.component';

describe('RangeSlidePickerComponent', () => {
  let component: RangeSlidePickerComponent;
  let fixture: ComponentFixture<RangeSlidePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeSlidePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeSlidePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
