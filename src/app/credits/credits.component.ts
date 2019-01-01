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
    projectId: null,
    income: null,
    personnelExpenses: null,
    executionExpenses: null,
    total: null
  };

  constructor(private creditService: CreditsService) { }


  computeTotal() {
    return Number(this.newCredit.income) - Number(this.newCredit.personnelExpenses) - Number(this.newCredit.executionExpenses);
  }

  addCredit() {
    this.newCredit.total = this.computeTotal();
    this.creditService.createCredit(this.newCredit)
      .subscribe((credit) => {
        this.credits.push(credit);
        this.newCredit = {
          _id: null,
          projectId: null,
          income: null,
          personnelExpenses: null,
          executionExpenses: null,
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
