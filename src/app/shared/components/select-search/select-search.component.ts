import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {SelectSearch} from '@utils/models/select-search.model';

@Component({
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss']
})
export class SelectSearchComponent implements OnChanges {
  private itemsContainer: ElementRef;
  @ViewChild('itemsContainer') set content(content: ElementRef) {
    this.itemsContainer = content;
  }
  showOptions = false;
  selectValue: string;
  value: string;
  clickSubscription: Subscription;
  @Input() values: SelectSearch[];
  @Input() fc: FormControl;
  constructor(private elementRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['values']) {
      this.values.forEach(val => {
        if (this.fc.value === val.id) {
          this.selectValue = val.label || val.id;
        }
      });
    }
  }

  selectedItem(event, option: SelectSearch) {
    event.stopPropagation();
    if (!this.fc.touched) {
      this.fc.markAsTouched();
    }
    this.fc.setValue(option.id);
    this.selectValue = option.label || option.id;
    this.value = '';
    this.showOptions = false;
    this.unsubscribe();
  }

  onInputFocus() {
    this.showOptions = !this.showOptions;
    this.value = '';
    this.unsubscribe();
    if (this.showOptions) {
      if (this.selectValue) {
        setTimeout(() => {
          this.itemsContainer.nativeElement.querySelector('.item-wrapper')
            .scrollTo(0, this.itemsContainer.nativeElement.querySelector('.selected').offsetTop - 100);
        });
      }
      this.clickSubscription = fromEvent(window, 'click').subscribe(clickEvent => {
        if (!this.elementRef.nativeElement.contains(clickEvent.target)) {
          this.showOptions = false;
          this.unsubscribe();
        }
      });
    }
  }

  onInputChange() {
    if (!this.fc.touched) {
      this.fc.markAsTouched();
    }
  }

  private unsubscribe() {
    if (this.clickSubscription && !this.clickSubscription.closed) {
      this.clickSubscription.unsubscribe();
    }
  }
}
