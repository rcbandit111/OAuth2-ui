import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './search-accordion.component.html',
  styleUrls: ['./search-accordion.component.scss']
})
export class SearchAccordionComponent implements OnInit {

  @Input() backgroundStyle: string;
  @Input()
  collapsed = true;
  @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggle(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }
}
