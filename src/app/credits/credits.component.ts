import { Component, OnInit } from '@angular/core';
import { Credit } from '../credit';
import { CreditsService } from '../credit.service';


@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {

  credit: Credit[];
  selectedCredit: Credit;
  newCredit: Credit = {
    project_id: null,
    total: null
  };

  constructor(private creditService: CreditsService) { }

  addCredit() {
    this.credit.push(this.newCredit);
    this.newCredit = {
      project_id: null,
      total: null
    }
  }

  getCredits() {
    this.creditService.getCredits()
      .subscribe((credit) => {   //modificado
        this.credit = credit;
      });
  }

  ngOnInit() {
    this.getCredits();
  }

}
