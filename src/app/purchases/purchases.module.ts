import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchasesInvoiceComponent } from './purchases-invoice/purchases-invoice.component';
import { AllComponent } from './all/all.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { ImportModule } from '../import/import.module';
import { PurchaseCommanderComponent } from './purchase-commander/purchase-commander.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AddItemComponent } from './add-item/add-item.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { AddItemToPurchaseInvoiceComponent } from './add-item-to-purchase-invoice/add-item-to-purchase-invoice.component';
import { UpdatePurchaseInvoiceComponent } from './update-purchase-invoice/update-purchase-invoice.component';
import { UpdateOrderDetailComponent } from './update-order-detail/update-order-detail.component';
import { UpdateMsPurchOrderDetailsComponent } from './update-ms-purch-order-details/update-ms-purch-order-details.component';


@NgModule({
  declarations: [
    PurchasesInvoiceComponent,
    AllComponent,
    PurchaseOrderComponent,
    PurchaseCommanderComponent,
    InvoiceComponent,
    AddItemComponent,
    UpdateItemComponent,
    AddItemToPurchaseInvoiceComponent,
    UpdatePurchaseInvoiceComponent,
    UpdateOrderDetailComponent,
    UpdateMsPurchOrderDetailsComponent
  ],
  imports: [
    CommonModule,
    PurchasesRoutingModule,
    ImportModule
  ]
})
export class PurchasesModule { }
