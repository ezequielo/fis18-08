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
  editable = false;

  constructor(private creditService: CreditsService, private router: Router) { }
<<<<<<< HEAD
=======

  // TOOD: move this to utils file
  refresh(): void {
    window.location.reload();
  }
>>>>>>> 2a869212b49da171bbe6519107ee24c1ba364144

  // TODO this is the same we have in credits.component ->  refactor
  computeTotal() {
    return Number(this.credit.income) - Number(this.credit.personnelExpenses) - Number(this.credit.executionExpenses);
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

  ngOnInit() {
  }

}
