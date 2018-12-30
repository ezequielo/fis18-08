import { Component, OnInit, Input } from '@angular/core';
import { Credit } from '../credit';

@Component({
  selector: '[app-editable-credits]',
  templateUrl: './editable-credits.component.html',
  styleUrls: ['./editable-credits.component.css']
})
export class EditableCreditsComponent implements OnInit {

  @Input() credit: Credit;
  editable = false;

  constructor() { }

  onEdit() {
    this.editable = ! this.editable;
  }

  ngOnInit() {
  }

}
