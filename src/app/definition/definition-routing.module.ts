import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { BranchSystemComponent } from './branch-system/branch-system.component';
import { ItemCategoriesComponent } from './item-categories/item-categories.component';
import { ItemUnitsComponent } from './item-units/item-units.component';
import { CustomerCategoriesComponent } from './customer-categories/customer-categories.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerTypesComponent } from './customer-types/customer-types.component';
import { MovementBookComponent } from './movement-book/movement-book.component';
import { SuppliersTypesComponent } from './suppliers-types/suppliers-types.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { EmployeesComponent } from './employees/employees.component';
import { JobsComponent } from './jobs/jobs.component';
import { StructureAdministrativeComponent } from './structure-administrative/structure-administrative.component';
import { MachinesEquipmentComponent } from './machines-equipment/machines-equipment.component';
import { CitiesComponent } from './cities/cities.component';
import { TypesOfVehiclesComponent } from './types-of-vehicles/types-of-vehicles.component';
import { VehicleShapesComponent } from './vehicle-shapes/vehicle-shapes.component';
import { BoxesComponent } from './boxes/boxes.component';

const routes: Routes = [
  {path:'items',component:ItemsComponent},
  {path:'branchs',component:BranchSystemComponent},
  {path:'item-categories',component:ItemCategoriesComponent},
  {path:'item-units',component:ItemUnitsComponent},
  {path:'customer-categories',component:CustomerCategoriesComponent},
  {path:'customer-types',component:CustomerTypesComponent},
  {path:'customers',component:CustomersComponent},
  {path:'movement-book',component:MovementBookComponent},
  {path:'suppliers-types',component:SuppliersTypesComponent},
  {path:'suppliers',component:SuppliersComponent},
  {path:'employees',component:EmployeesComponent},
  {path:'jobs',component:JobsComponent},
  {path:'structure-administrative',component:StructureAdministrativeComponent},
  {path:'machines-equipment',component:MachinesEquipmentComponent},
  {path:'cities',component:CitiesComponent},
  {path:'Types-of-vehicles',component:TypesOfVehiclesComponent},
  {path:'Vehicle-shapes',component:VehicleShapesComponent},
  {path:'boxes',component:BoxesComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefinitionRoutingModule { }
