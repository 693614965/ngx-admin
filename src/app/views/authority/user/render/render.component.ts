import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  template: `
    <div [innerHTML]="renderValue"></div>
  `,
})
export class RenderStatusComponent implements ViewCell, OnInit {
  renderValue: SafeHtml;

  @Input() value: string | number;
  @Input() rowData: any;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.value === 0) {
      this.renderValue = this.sanitizer.bypassSecurityTrustHtml('<span style="color: blue">正常</span>');
    } else if (this.value === 1) {
      this.renderValue = this.sanitizer.bypassSecurityTrustHtml('<span style="color: red">禁用</span>');
    } else {
      this.renderValue = this.value.toString();
    }
  }
}

@Component({
  template: `
    <div [innerHTML]="renderValue"></div>
  `,
})
export class RenderSuperAdminComponent implements ViewCell, OnInit {
  renderValue: SafeHtml;
  @Input() value: string | number;
  @Input() rowData: any;

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    if (this.value) {
      this.renderValue = this.sanitizer.bypassSecurityTrustHtml('<span style="color: blue">是</span>');
    } else {
      this.renderValue = this.sanitizer.bypassSecurityTrustHtml('<span style="color: red">否</span>');
    }
  }

}
