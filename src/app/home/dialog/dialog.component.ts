import { Component } from '@angular/core';
import {Dialog, DialogModule, DialogRef} from '@angular/cdk/dialog';
import { CompanyInfoDialogComponent } from '../company-info-dialog/company-info-dialog.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(public dialog: Dialog) {}

  openDialog(): void {
    this.dialog.open<string>(CompanyInfoDialogComponent);
  }
}
