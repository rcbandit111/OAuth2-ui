import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss']
})
export class ListTableComponent {
  @Input()
  public list: any = [];
  @Input()
  public config = {
    header: null,
    selector: null,
    editable: true
  };
  @Output()
  public removeAction: EventEmitter<any> = new EventEmitter<any>();

  public remove(element: any) {
    const index = this.list.indexOf(element);
    if (index > -1) {
      this.removeAction.emit(element);
      this.list.splice(index, 1);
    }
  }
}
