import { Component, OnInit } from '@angular/core';
import { Credit } from '../credit';
import { CreditsService } from '../credit.service';
import { Router } from '@angular/router';
import {  FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-new-credit',
  templateUrl: './new-credit.component.html',
  styleUrls: ['./new-credit.component.css']
})
export class NewCreditComponent implements OnInit {

  newCreditForm = this.fb.group({
    projectId: ['', Validators.required],
    income: ['', Validators.required],
    personnelExpenses: [''],
    executionExpenses: ['']
  })

  onSubmit() {
    this.newCredit = {
      _id: null,
      projectId: this.newCreditForm.value.projectId,
      income: this.newCreditForm.value.income,
      personnelExpenses: this.newCreditForm.value.personnelExpenses !== ""? this.newCreditForm.value.personnelExpenses : 0,
      executionExpenses: this.newCreditForm.value.executionExpenses !== "" ? this.newCreditForm.value.executionExpenses: 0,
      total: null
    }
    this.addCredit();
  }

  constructor(private creditService: CreditsService, private router: Router, private fb: FormBuilder) { }

  newCredit: Credit = {
    _id: null,
    projectId: null,
    income: 0,
    personnelExpenses: 0,
    executionExpenses: 0,
    total: 0
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
          income: 0,
          personnelExpenses: 0,
          executionExpenses: 0,
          total: 0
        };
        this.router.navigateByUrl('/credits');
      });
  }

}
