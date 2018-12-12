import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  header: string;
  proposedTime: string;
  btnConfirmTitle: string;
  btnDeclineTitle: string;

  constructor(private dataService: DataService) { 
    this.header = 'Nearest avaliable time is';
    this.btnConfirmTitle = 'Confirm';
    this.btnDeclineTitle = 'Go back';
  }

  ngOnInit() {
    this.dataService.proposedTime.subscribe(time => this.proposedTime = time);
  }

  confirm() {
    this.dataService.postAnswer(true, 'Name', '+380123456789');
  }

  decline() {
    this.dataService.postAnswer(false);
  }

}
