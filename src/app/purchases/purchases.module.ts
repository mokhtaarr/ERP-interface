import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchasesInvoiceComponent } from './purchases-invoice/purchases-invoice.component';
import { AllComponent } from './all/all.component';


@NgModule({
  declarations: [
    PurchasesInvoiceComponent,
    AllComponent
  ],
  imports: [
    CommonModule,
    PurchasesRoutingModule
  ]
})
export class PurchasesModule { }
