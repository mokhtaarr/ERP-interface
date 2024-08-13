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
  ],
  imports: [
    CommonModule,
    AccountsModuleRoutingModule,
    ImportModule,
    AgGridModule

  ]
})
export class AccountsModuleModule { }
