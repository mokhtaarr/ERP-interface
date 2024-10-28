import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { AccountsGuideComponent } from './accounts-guide/accounts-guide.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { SysAnalyticalCodeComponent } from './sys-analytical-code/sys-analytical-code.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { FinancialYearComponent } from './financial-year/financial-year.component';
import { SettlementsComponent } from './settlements/settlements.component';
import { JournalEntryComponent } from './journal-entry/journal-entry.component';
import { ReceiptVoucherComponent } from './MsReceiptNote/receipt-voucher.component';
import { ExchangeVoucherComponent } from './MsPaymentNote/exchange-voucher.component';

const routes: Routes = [
  {path:'',component:AllComponent},
  {path:'accounts-guide',component:AccountsGuideComponent},
  {path:'CalCostCenter',component:CostCenterComponent},
  {path:'SysAnalyticalCode',component:SysAnalyticalCodeComponent},
  {path:'activities',component:ActivitiesComponent},
  {path:'currencies' , component:CurrenciesComponent},
  {path:'Financial-Year',component:FinancialYearComponent},
  {path:'settlements',component:SettlementsComponent},
  {path:'journal-entry',component:JournalEntryComponent},
  {path:'receipt-voucher',component:ReceiptVoucherComponent},
  {path:'exchange-voucher',component:ExchangeVoucherComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsModuleRoutingModule { }
