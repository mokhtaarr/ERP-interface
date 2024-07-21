import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { AccountsGuideComponent } from './accounts-guide/accounts-guide.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { SysAnalyticalCodeComponent } from './sys-analytical-code/sys-analytical-code.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CurrenciesComponent } from './currencies/currencies.component';

const routes: Routes = [
  {path:'',component:AllComponent},
  {path:'accounts-guide',component:AccountsGuideComponent},
  {path:'CalCostCenter',component:CostCenterComponent},
  {path:'SysAnalyticalCode',component:SysAnalyticalCodeComponent},
  {path:'activities',component:ActivitiesComponent},
  {path:'currencies' , component:CurrenciesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsModuleRoutingModule { }
