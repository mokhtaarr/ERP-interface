import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasesComponent } from '../home/purchases/purchases.component';

const routes: Routes = [
  {path:'purchases-invoice',component:PurchasesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule { }
