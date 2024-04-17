import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BranchCompanyComponent } from './branch-company/branch-company.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DefinitionComponent } from './definition/definition.component';
import { StoresComponent } from './stores/stores.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { BranchFormComponent } from './branch-form/branch-form.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'Company-Branches',component:BranchCompanyComponent},
  {path:'Contact-Us',component:ContactUsComponent},
  {path:'definition',component:DefinitionComponent},
  {path:'stores',component:StoresComponent},
  {path:'purchases',component:PurchasesComponent},
  {path:'branch-form',component:BranchFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
