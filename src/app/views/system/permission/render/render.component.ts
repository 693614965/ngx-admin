import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  selector: 'ngx-render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.scss'],
})
export class RenderNameComponent implements OnInit {
  @Input() value: string | number;
  @Input() rowData: any;
  constructor() {}

  ngOnInit() {
    console.info(this.value);
    console.info(this.rowData);
  }
}
