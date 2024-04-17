import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefinitionRoutingModule } from './definition-routing.module';
import { ItemsComponent } from './items/items.component';
import { SharedModule } from '../shared/shared.module';
import { ImportModule } from '../import/import.module';
import { BranchSystemComponent } from './branch-system/branch-system.component';
import { ItemCategoriesComponent } from './item-categories/item-categories.component';
import { ItemUnitsComponent } from './item-units/item-units.component';
import { CustomerCategoriesComponent } from './customer-categories/customer-categories.component';
import { CustomersComponent } from './customers/customers.component';

@NgModule({
  declarations: [
    ItemsComponent,
    BranchSystemComponent,
    ItemCategoriesComponent,
    ItemUnitsComponent,
    CustomerCategoriesComponent,
    CustomersComponent
  ],
  imports: [
    CommonModule,
    DefinitionRoutingModule,
    ImportModule,
    SharedModule
    
   
   
  ]
})
export class DefinitionModule { }
