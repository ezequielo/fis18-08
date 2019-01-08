import { Component, OnInit, Input } from '@angular/core';
import { Credit } from '../credit';
import { ActivatedRoute } from '@angular/router';
import { CreditsService } from '../credit.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-detail-credit',
  templateUrl: './detail-credit.component.html',
  styleUrls: ['./detail-credit.component.css']
})
export class DetailCreditComponent implements OnInit {
 
  credit: Credit = {
    _id: null,
    projectId: null, 
    income: null,
    personnelExpenses: null,
    executionExpenses: null,
    total: null
  };

  editable = false;

  constructor(private route: ActivatedRoute, private creditService: CreditsService, private router: Router) { }

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

}
