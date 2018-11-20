import { Component, OnInit, Input } from '@angular/core';
import { IBox } from './box.model';

@Component({
  selector: 'box-list-item',
  templateUrl: './box-list-item.component.html',
  styleUrls: ['./box-list-item.component.css']
})

export class BoxListItemComponent implements OnInit {
  @Input() item : IBox;

  constructor() { }

  ngOnInit() {
  }

}
