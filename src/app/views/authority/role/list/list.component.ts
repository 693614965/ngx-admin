import {Component, OnInit} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {RoleService} from '../../../../service/role.service';
import {RoleAddComponent} from '../add/add.component';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class RoleListComponent implements OnInit {
  title = '提示!';
  listOfData = [];

  constructor(
    private dialogService: NbDialogService,
    private roleService: RoleService,
  ) {
  }

  ngOnInit() {
    this.fetch();
  }

  fetch(): void {
    this.roleService.roles({}).subscribe(resp => {
      console.info(resp);
      this.listOfData = resp.data.content;
    });
  }

  onAddClick() {
    this.dialogService
      .open(RoleAddComponent, {
        context: {
          role: {},
        },
      })
      .onClose.subscribe(role => role && this.fetch());
  }

  onEditClick(row) {
    this.dialogService
      .open(RoleAddComponent, {
        context: {
          role: row,
        },
      })
      .onClose.subscribe(role => role && this.fetch());
  }

  onRemoveClick() {

  }

}
