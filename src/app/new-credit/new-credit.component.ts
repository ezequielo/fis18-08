import { Component, OnInit } from '@angular/core';
import { Credit } from '../credit';
import { CreditsService } from '../credit.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-new-credit',
  templateUrl: './new-credit.component.html',
  styleUrls: ['./new-credit.component.css']
})
export class NewCreditComponent implements OnInit {

  constructor(private creditService: CreditsService, private router: Router) { }

  newCredit: Credit = {
    _id: null,
    projectId: null,
    income: null,
    personnelExpenses: null,
    executionExpenses: null,
    total: null
  };

  ngOnInit() {
  }

  computeTotal() {
    return Number(this.newCredit.income) - Number(this.newCredit.personnelExpenses) - Number(this.newCredit.executionExpenses);
  }

  addCredit() {
    this.newCredit.total = this.computeTotal();
    this.creditService.createCredit(this.newCredit)
      .subscribe((credit) => {
        this.newCredit = {
          _id: null,
          projectId: null,
          income: null,
          personnelExpenses: null,
          executionExpenses: null,
          total: null
        };
        this.router.navigateByUrl('/credits');
      });
  }

}
