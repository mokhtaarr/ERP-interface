import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasesComponent } from '../home/purchases/purchases.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { AllComponent } from './all/all.component';
import { PurchaseCommanderComponent } from './purchase-commander/purchase-commander.component';
import { PurchasesInvoiceComponent } from './purchases-invoice/purchases-invoice.component';
import { MsReturnPurchaseInvoiceComponent } from './ms-return-purchase-invoice/ms-return-purchase-invoice.component';

const routes: Routes = [
  {path:'',component:AllComponent},
  {path:'purchases-invoice',component:PurchasesComponent},
  {path:'Purchase-order',component:PurchaseOrderComponent},
  {path:'Purchase-commander',component:PurchaseCommanderComponent},
  {path:'invoice',component:PurchasesInvoiceComponent},
  {path:'ReturnPurchase',component:MsReturnPurchaseInvoiceComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule { }
