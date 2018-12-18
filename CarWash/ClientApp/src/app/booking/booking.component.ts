import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, OnDestroy {
  header: string;
  btnConfirmTitle: string;
  btnDeclineTitle: string;
  proposedTime: string;
  private isDeclined = false;
  
  constructor(private dataService: DataService, private router: Router) { 
    this.header = 'Nearest avaliable time is';
    this.btnConfirmTitle = 'Confirm';
    this.btnDeclineTitle = 'Go back';
  }
  
  ngOnInit() {
    this.dataService.proposedTime.subscribe(time => this.proposedTime = time);
  }
  
  ngOnDestroy() {
    if(!this.isDeclined){
      this.decline();
    }
  }
  
  confirm() {
    var isSucceeded = this.dataService.postAnswer(true, 'Name', '+380123456789');
    if (isSucceeded) {
      // some actions
    }
  }

  decline() {
    var isSucceeded = this.dataService.postAnswer(false);
    if (isSucceeded) {
      // TODO: clear timeFrom and timeTo data
      this.isDeclined = true;
      this.router.navigateByUrl('/pick-time');
    }
  }

}
