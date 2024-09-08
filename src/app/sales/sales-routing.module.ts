import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { SaleOrderComponent } from './sale-order/sale-order.component';
import { SalesOfferComponent } from './sales-offer/sales-offer.component';

const routes: Routes = [
  {path:'',component:AllComponent},
  {path:'sales-order',component:SaleOrderComponent},
  {path:'sales-offer',component:SalesOfferComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
