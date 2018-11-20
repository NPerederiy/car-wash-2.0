import { Component, OnInit } from '@angular/core';
import { IBox, Box } from '../box-list-item/box.model';

@Component({
  selector: 'box-list',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.css']
})

export class BoxListComponent implements OnInit {
  items : IBox[];

  constructor() {
    this.items = [
      new Box(),
      new Box(),
      new Box(),
      new Box()
    ]
   }

  ngOnInit() {
  }

}
