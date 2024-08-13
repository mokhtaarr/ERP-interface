import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchasesInvoiceComponent } from './purchases-invoice/purchases-invoice.component';
import { AllComponent } from './all/all.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { ImportModule } from '../import/import.module';
import { PurchaseCommanderComponent } from './purchase-commander/purchase-commander.component';
import { InvoiceComponent } from './invoice/invoice.component';


@NgModule({
  declarations: [
    PurchasesInvoiceComponent,
    AllComponent,
    PurchaseOrderComponent,
    PurchaseCommanderComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    PurchasesRoutingModule,
    ImportModule
  ]
})
export class PurchasesModule { }
