import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsModuleRoutingModule } from './accounts-module-routing.module';
import { AllComponent } from './all/all.component';
import { AccountsGuideComponent } from './accounts-guide/accounts-guide.component';
import { ImportModule } from '../import/import.module';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { SysAnalyticalCodeComponent } from './sys-analytical-code/sys-analytical-code.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { FinancialYearComponent } from './financial-year/financial-year.component';
import { AgGridModule } from 'ag-grid-angular';
import { CheckboxRendererComponent } from './checkbox-renderer/checkbox-renderer.component';
import { SettlementsComponent } from './settlements/settlements.component';
import { JournalEntryComponent } from './journal-entry/journal-entry.component';
import { ReceiptVoucherComponent } from './MsReceiptNote/receipt-voucher.component';
import { ExchangeVoucherComponent } from './MsPaymentNote/exchange-voucher.component';
import { AllSearchAccountsComponent } from './all-search-accounts/all-search-accounts.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { UpdateAccountFromDataBaseComponent } from './update-account-from-data-base/update-account-from-data-base.component';


@NgModule({
  declarations: [
    AllComponent,
    AccountsGuideComponent,
    CostCenterComponent,
    SysAnalyticalCodeComponent,
    ActivitiesComponent,
    CurrenciesComponent,
    FinancialYearComponent,
    CheckboxRendererComponent,
    SettlementsComponent,
    JournalEntryComponent,
    ReceiptVoucherComponent,
    ExchangeVoucherComponent,
    AllSearchAccountsComponent,
    UpdateAccountComponent,
    UpdateAccountFromDataBaseComponent,
  ],
  imports: [
    CommonModule,
    AccountsModuleRoutingModule,
    ImportModule,
    AgGridModule

  ]
})
export class AccountsModuleModule { }
