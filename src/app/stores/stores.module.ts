import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoresRoutingModule } from './stores-routing.module';
import { AllComponent } from './all/all.component';
import { ConvertingStoresComponent } from './converting-stores/converting-stores.component';
import { ImportModule } from '../import/import.module';
import { StoreExchangeComponent } from './store-exchange/store-exchange.component';
import { SupplyStoreComponent } from './supply-store/supply-store.component';
import { RequestConvertStoreComponent } from './request-convert-store/request-convert-store.component';
import { InventoryOfItemsComponent } from './inventory-of-items/inventory-of-items.component';


@NgModule({
  declarations: [
    AllComponent,
    ConvertingStoresComponent,
    StoreExchangeComponent,
    SupplyStoreComponent,
    RequestConvertStoreComponent,
    InventoryOfItemsComponent
  ],
  imports: [
    CommonModule,
    StoresRoutingModule,
    ImportModule
  ]
})
export class StoresModule { }
