import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-checkbox-renderer',
  template: `<input type='checkbox' [checked]="params.value" (change)="onChange($event)" />`
})
export class CheckboxRendererComponent implements ICellRendererAngularComp  {
  params: any;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }

  onChange(event: any) {
    this.params.node.setDataValue(this.params.colDef.field, event.target.checked);
  }
}
