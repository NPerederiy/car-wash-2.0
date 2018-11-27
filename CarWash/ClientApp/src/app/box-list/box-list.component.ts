import { Component, OnInit } from '@angular/core';
import { Box } from '@shared/models/box.model';
import { IBox } from "@shared/models/interfaces/box.interface";

@Component({
  selector: 'box-list',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.css']
})

export class BoxListComponent implements OnInit {
  items: IBox[];
  
  constructor() {
    this.items = [
      new Box('Box #1'),
      new Box('Box #2'),
      new Box('Box #3'),
      new Box('Box #4'),
    ]
   }

  ngOnInit() {
  }

}
