import { Component, OnInit, Input } from '@angular/core';
import { Credit } from '../credit';
import { CreditsService } from '../credit.service';

@Component({
  selector: '[app-editable-credits]',
  templateUrl: './editable-credits.component.html',
  styleUrls: ['./editable-credits.component.css']
})
export class EditableCreditsComponent implements OnInit {

  @Input() credit: Credit;
  editable = false;

  constructor(private creditService: CreditsService) { }

  // TOOD: move this to utils file
  refresh(): void {
    window.location.reload();
  }

  onEdit() {
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
    this.refresh();
  }

  ngOnInit() {
  }

}
