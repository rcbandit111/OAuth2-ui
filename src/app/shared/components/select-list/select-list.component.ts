import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss']
})
export class SelectListComponent implements OnInit, OnChanges {
  @ViewChild('itemsContainer') itemsContainer: ElementRef;
  showItem = false;
  value: string;
  selectValue: string;
  showMerchants = false;
  clickSubs: Subscription;
  @Input() values: Array<{id: any, label: string}>;
  @Input() fc: FormControl;
  constructor(private elementRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['values']) {
      this.values.forEach(val => {
        if (+this.fc.value !== null && +this.fc.value === val.id) {
          this.selectValue = val.label;
        }
      });
    }
  }

  ngOnInit() {
  }

  selected(event, country: any) {
    event.stopPropagation();
    if (!this.fc.touched) {
      this.fc.markAsTouched();
    }
    this.fc.setValue(country.id);
    this.selectValue = country.label;
    this.value = '';
    this.showMerchants = false;
    this.unSubs();  }

  onInputFocus(event) {
    this.showMerchants = !this.showMerchants;
    this.value = '';
    this.unSubs();
    if (this.showMerchants) {
      if (this.selectValue) {
        setTimeout(() => {
          this.itemsContainer.nativeElement.querySelector('.div-padding')
            .scrollTo(0, this.itemsContainer.nativeElement.querySelector('.selected').offsetTop - 100);
        });
      }

      this.clickSubs = fromEvent(window, 'click').subscribe(clickEvent => {
        if (!this.elementRef.nativeElement.contains(clickEvent.target)) {
          this.showMerchants = false;
          this.unSubs();
        }
      });
    }
  }

  onInputChange() {
    if (!this.fc.touched) {
      this.fc.markAsTouched();
    }
  }

  hideItem() {
    if (this.values.filter(val => val.label.toUpperCase().includes(this.value.toUpperCase())).length > 0) {
      this.showItem = false;
    } else {
      this.showItem = true;
    }
  }

  private unSubs() {
    if (this.clickSubs && !this.clickSubs.closed) {
      this.clickSubs.unsubscribe();
    }
  }
}
