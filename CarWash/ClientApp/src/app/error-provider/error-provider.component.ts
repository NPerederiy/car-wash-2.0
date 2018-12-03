import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-provider',
  templateUrl: './error-provider.component.html',
  styleUrls: ['./error-provider.component.css']
})

export class ErrorProviderComponent implements OnInit {
  header: string;
  descr: string;

  constructor() {
    this.header = "Error 404";
    this.descr = "Woops. Looks like this page doesn't exist."
   }

  ngOnInit() {
  }

}
