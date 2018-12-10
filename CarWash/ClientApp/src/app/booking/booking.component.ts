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
  btnTitle: string;

  constructor(private dataService: DataService) { 
    this.header = 'Nearest avaliable time is';
    this.btnTitle = 'Submit';
  }

  ngOnInit() {
    this.dataService.proposedTime.subscribe(time => this.proposedTime = time);
  }

  submit() {
    this.dataService.postSubmit('Name', '+380123456789', true);
    console.log('success!');
    
  }

}
