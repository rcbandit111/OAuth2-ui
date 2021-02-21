import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IPagination} from '@utils/interfaces';
import {Pagination} from '@utils/models';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, DoCheck {

  @Input() pagination: IPagination;

  previous = null;
  next = null;

  buttons: string[] = [];
  show = true;

  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this._initPagination();
  }

  ngDoCheck(): void {
    this._initPagination();
  }

  private _initPagination() {
    if (this.pagination.current > 1) {
      this.previous = this.pagination.current - 1;
    } else {
      this.previous = null;
    }

    if (this.pagination.current < this.pagination.total) {
      this.next = this.pagination.current + 1;
    } else {
      this.next = null;
    }

    this.buttons = [];

    if (this.pagination.total < 6) {
      this._generateButtons(1, this.pagination.total);
    } else {
      if (this.pagination.current > 4) {
        this.buttons.push('1');
        this.buttons.push('...');
      }

      if (this.pagination.current < 5) {
        this._generateButtons(1);
      } else if (this.pagination.current > (this.pagination.total - 4)) {
        this._generateButtons(this.pagination.total - 4);
      } else {
        this._generateButtons(this.pagination.current - 2);
      }

      if (this.pagination.current < this.pagination.total - 3) {
        this.buttons.push('...');
        this.buttons.push(this.pagination.total.toString());
      }
    }
  }

  private _generateButtons(from: number, length?: number): void {
    const to = length ? length : 5;
    for (let i = from; i < from + to; i++) {
      this.buttons.push((i).toString());
    }
  }

  onClickButton(page: string): void {
    if (page && page !== '...' && page !== this.pagination.current.toString()) {
      this.pageChange.emit(parseInt(page, 10));
    }
  }
}
