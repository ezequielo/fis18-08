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

  constructor(private creditService: CreditsService) { }

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
