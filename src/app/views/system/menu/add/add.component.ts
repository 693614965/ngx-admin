import {Component, Input, OnInit} from '@angular/core';
import {
  NbComponentStatus,
  NbDialogRef,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';
import {MenuService} from '../../../../service/menu.service';
import {FSEntry} from '../list/list.component';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class MenuAddComponent implements OnInit {
  @Input() menus: FSEntry[] = [];
  @Input() menu: FSEntry = {};
  selectedValue: string[] = [];
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'warning';
  title = '提示!';

  constructor(
    private ref: NbDialogRef<MenuAddComponent>,
    private menuService: MenuService,
    private toastrService: NbToastrService,
  ) {
  }

  ngOnInit() {
    this.menus.map(menu => {
      menu.label = menu.name;
      menu.value = menu.id;
      if (menu.id === this.menu.pid) {
        this.selectedValue.push(menu.id);
      }
      if (menu.children) {
        menu.children.map(children => {
          children.label = children.name;
          children.value = children.id;
          if (children.id === this.menu.pid) {
            this.selectedValue.push(menu.id);
            this.selectedValue.push(children.id);
          }
          if (children.children) {
            children.children.map(child => {
              child.label = child.name;
              child.value = child.id;
            })
          }
        })
      }
    });
  }

  changeHandle = (event) => {
    console.info(event);
    this.selectedValue = event;
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    console.info(this.menu);
    if (!this.menu.id) {
      this.save();
    } else {
      this.update();
    }
  }

  private update() {
    if (this.selectedValue && this.selectedValue.length !== 0) {
      this.menu.pid = this.selectedValue[this.selectedValue.length - 1];
    }
    this.menuService.update(this.menu).subscribe(resp => {
      console.info(resp);
      if (resp.code === 1) {
        this.showToast(this.status, this.title, resp.msg);
      } else {
        this.status = 'success';
        this.showToast(this.status, this.title, resp.msg);
        this.ref.close(this.menu);
      }
    });
  }

  private save() {
    if (this.selectedValue && this.selectedValue.length !== 0) {
      this.menu.pid = this.selectedValue[this.selectedValue.length - 1];
    }
    this.menuService.add(this.menu).subscribe(resp => {
      console.info(resp);
      if (resp.code === 1) {
        this.showToast(this.status, this.title, resp.msg);
      } else {
        this.status = 'success';
        this.showToast(this.status, this.title, resp.msg);
        this.ref.close(this.menu);
      }
    });
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : '';

    this.toastrService.show(body, titleContent, config);
  }
}
