import { Component, OnInit } from '@angular/core';
import { Credit } from '../credit';
import { CreditsService } from '../credit.service';


@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {

  credits: Credit[];

  newCredit: Credit = {
    _id: null,
    project_id: null,
    total: null
  };

  constructor(private creditService: CreditsService) { }

  addCredit() {
    this.creditService.createCredit(this.newCredit)
      .subscribe((credit) => {
        this.credits.push(credit);
        this.newCredit = {
          _id: null,
          project_id: null,
          total: null
        };
      });
  }

  getCredits() {
    this.creditService.getCredits()
      .subscribe((credits) => {   //modificado
        this.credits = credits;
      });
  }

  ngOnInit() {
    this.getCredits();
  }

}
