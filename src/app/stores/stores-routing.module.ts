import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { ConvertingStoresComponent } from './converting-stores/converting-stores.component';
import { StoreExchangeComponent } from './store-exchange/store-exchange.component';
import { SupplyStoreComponent } from './supply-store/supply-store.component';
import { RequestConvertStoreComponent } from './request-convert-store/request-convert-store.component';

const routes: Routes = [
  {path:'',component:AllComponent},
  {path:'converting-stores',component:ConvertingStoresComponent},
  {path:'store-exchange',component:StoreExchangeComponent},
  {path:'supply-store',component:SupplyStoreComponent},
  {path:'request-convert-store',component:RequestConvertStoreComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
