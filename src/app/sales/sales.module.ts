import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { AllComponent } from './all/all.component';
import { SaleOrderComponent } from './sale-order/sale-order.component';
import { ImportModule } from '../import/import.module';
import { SalesOfferComponent } from './sales-offer/sales-offer.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { AddItemsToSalesInvoiceComponent } from './add-items-to-sales-invoice/add-items-to-sales-invoice.component';
import { UpdateSalesInvoiceDetailsComponent } from './update-sales-invoice-details/update-sales-invoice-details.component';
import { UpdateSalesOfferDetailsComponent } from './update-sales-offer-details/update-sales-offer-details.component';
import { UpdateSalesOrderDetailComponent } from './update-sales-order-detail/update-sales-order-detail.component';
import { SalesOfferRequestComponent } from './sales-offer-request/sales-offer-request.component';
import { UpdateSalesOfferItemRequestComponent } from './update-sales-offer-item-request/update-sales-offer-item-request.component';
import { MsReturnSalesComponent } from './ms-return-sales/ms-return-sales.component';
import { UpdateMsReturnSalesItemCardsComponent } from './update-ms-return-sales-item-cards/update-ms-return-sales-item-cards.component';


@NgModule({
  declarations: [
    AllComponent,
    SaleOrderComponent,
    SalesOfferComponent,
    SalesInvoiceComponent,
    AddItemsToSalesInvoiceComponent,
    UpdateSalesInvoiceDetailsComponent,
    UpdateSalesOfferDetailsComponent,
    UpdateSalesOrderDetailComponent,
    SalesOfferRequestComponent,
    UpdateSalesOfferItemRequestComponent,
    MsReturnSalesComponent,
    UpdateMsReturnSalesItemCardsComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    ImportModule
  ]
})
export class SalesModule { }
