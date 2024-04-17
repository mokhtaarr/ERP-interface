import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { BranchSystemComponent } from './branch-system/branch-system.component';
import { ItemCategoriesComponent } from './item-categories/item-categories.component';
import { ItemUnitsComponent } from './item-units/item-units.component';
import { CustomerCategoriesComponent } from './customer-categories/customer-categories.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  {path:'items',component:ItemsComponent},
  {path:'branchs',component:BranchSystemComponent},
  {path:'item-categories',component:ItemCategoriesComponent},
  {path:'item-units',component:ItemUnitsComponent},
  {path:'customer-categories',component:CustomerCategoriesComponent},
  {path:'customers',component:CustomersComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefinitionRoutingModule { }
