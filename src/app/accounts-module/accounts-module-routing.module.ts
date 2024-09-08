import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { AccountsGuideComponent } from './accounts-guide/accounts-guide.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { SysAnalyticalCodeComponent } from './sys-analytical-code/sys-analytical-code.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { FinancialYearComponent } from './financial-year/financial-year.component';
import { ExchangeDocumentComponent } from './exchange-document/exchange-document.component';
import { ReceiptDocumentComponent } from './receipt-document/receipt-document.component';
import { SettlementsComponent } from './settlements/settlements.component';

const routes: Routes = [
  {path:'',component:AllComponent},
  {path:'accounts-guide',component:AccountsGuideComponent},
  {path:'CalCostCenter',component:CostCenterComponent},
  {path:'SysAnalyticalCode',component:SysAnalyticalCodeComponent},
  {path:'activities',component:ActivitiesComponent},
  {path:'currencies' , component:CurrenciesComponent},
  {path:'Financial-Year',component:FinancialYearComponent},
  {path:'exchange-document',component:ExchangeDocumentComponent},
  {path:'receipt-document',component:ReceiptDocumentComponent},
  {path:'settlements',component:SettlementsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsModuleRoutingModule { }
