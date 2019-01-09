import { Component, OnInit, Input } from '@angular/core';
import { Credit } from '../credit';
import { Rate } from '../rate';
import { ActivatedRoute } from '@angular/router';
import { CreditsService } from '../credit.service';
import { RatesService } from '../rates.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-detail-credit',
  templateUrl: './detail-credit.component.html',
  styleUrls: ['./detail-credit.component.css']
})
export class DetailCreditComponent implements OnInit {
 
  credit: Credit = {
    _id: null,
    created: null,
    projectId: null, 
    income: null,
    personnelExpenses: null,
    executionExpenses: null,
    total: null
  };

  editable = false;
  displayDollars = false;
  totalDollars = null;

  rate: Rate = {
    rate: null
  };

  constructor(private route: ActivatedRoute, private creditService: CreditsService, private router: Router,
    private ratesService: RatesService) { }

  getCredit(id: string) {
    this.creditService.getCredit(id)
      .subscribe((credit) => {   //modificado
        this.credit = credit;
      });
  }

  computeTotal() {
    return Number(this.credit.income) - Number(this.credit.personnelExpenses) - Number(this.credit.executionExpenses);
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.getCredit(id);
  }

  onEdit() {
    this.credit.total = this.computeTotal();
    this.editable = ! this.editable;
    if (this.editable === false) {
      this.creditService.editCredit(this.credit)
      .subscribe((credit: Credit) => {
        this.credit = credit;
      });
    }
  }

  onDelete() {
    this.creditService.deleteCredit(this.credit._id).subscribe();
    this.router.navigateByUrl('/credits');
  }

  onTotalDollars() {
    this.ratesService.getRate('usd').subscribe((rate: Rate) => {
      if (rate){
        this.totalDollars = rate.rate * this.credit.total; 
        this.displayDollars = true;
      } else {
        console.log("Unable get rates");
        this.displayDollars = false;
      }
    })
  }
}
