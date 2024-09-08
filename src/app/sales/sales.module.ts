import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { AllComponent } from './all/all.component';
import { SaleOrderComponent } from './sale-order/sale-order.component';
import { ImportModule } from '../import/import.module';
import { SalesOfferComponent } from './sales-offer/sales-offer.component';


@NgModule({
  declarations: [
    AllComponent,
    SaleOrderComponent,
    SalesOfferComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    ImportModule
  ]
})
export class SalesModule { }
