import { Component, OnInit, Input } from '@angular/core';
import { Credit } from '../credit';
import { CreditsService } from '../credit.service';
import { Router } from '@angular/router';


@Component({
  selector: '[app-editable-credits]',
  templateUrl: './editable-credits.component.html',
  styleUrls: ['./editable-credits.component.css']
})
export class EditableCreditsComponent implements OnInit {

  @Input() credit: Credit;

  constructor(private creditService: CreditsService, private router: Router) { }

  ngOnInit() {
  }

}
