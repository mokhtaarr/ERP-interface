import { Component } from '@angular/core';
import {Dialog, DialogModule, DialogRef} from '@angular/cdk/dialog';

@Component({
  selector: 'app-company-info-dialog',
  templateUrl: './company-info-dialog.component.html',
  styleUrls: ['./company-info-dialog.component.scss']
})
export class CompanyInfoDialogComponent {

  constructor(public dialogRef: DialogRef) {}

}
