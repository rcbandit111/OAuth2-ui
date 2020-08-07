import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() public title = 'Are you sure?';

  constructor() { }

  ngOnInit() { }

}
