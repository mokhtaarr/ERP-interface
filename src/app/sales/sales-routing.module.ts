import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { SaleOrderComponent } from './sale-order/sale-order.component';
import { SalesOfferComponent } from './sales-offer/sales-offer.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { SalesOfferRequestComponent } from './sales-offer-request/sales-offer-request.component';
import { MsReturnSalesComponent } from './ms-return-sales/ms-return-sales.component';

const routes: Routes = [
  {path:'',component:AllComponent},
  {path:'sales-order',component:SaleOrderComponent},
  {path:'sales-offer',component:SalesOfferComponent},
  {path:'sales-invoice',component:SalesInvoiceComponent},
  {path:'sales-offer-request',component:SalesOfferRequestComponent},
  {path:'MsReturnSales',component:MsReturnSalesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
