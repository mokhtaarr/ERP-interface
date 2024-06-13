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
import { PartitionPopupComponent } from './partition-popup/partition-popup.component';
import { AddPartitionPopupComponent } from './add-partition-popup/add-partition-popup.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { CustomerBranchesComponent } from './customer-branches/customer-branches.component';
import { CustomerContactComponent } from './customer-contact/customer-contact.component';
import { AddVendorBranchComponent } from './add-vendor-branch/add-vendor-branch.component';
import { VendorContactComponent } from './vendor-contact/vendor-contact.component';

@NgModule({
  declarations: [
    ItemsComponent,
    BranchSystemComponent,
    ItemCategoriesComponent,
    ItemUnitsComponent,
    CustomerCategoriesComponent,
    CustomersComponent,
    CustomerTypesComponent,
    MovementBookComponent,
    SuppliersTypesComponent,
    SuppliersComponent,
    EmployeesComponent,
    JobsComponent,
    StructureAdministrativeComponent,
    MachinesEquipmentComponent,
    CitiesComponent,
    TypesOfVehiclesComponent,
    VehicleShapesComponent,
    PartitionPopupComponent,
    AddPartitionPopupComponent,
    DeleteConfirmComponent,
    CustomerBranchesComponent,
    CustomerContactComponent,
    AddVendorBranchComponent,
    VendorContactComponent
  ],
  imports: [
    CommonModule,
    DefinitionRoutingModule,
    ImportModule,
    SharedModule
    
   
   
  ]
})
export class DefinitionModule { }
