import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsModuleRoutingModule } from './accounts-module-routing.module';
import { AllComponent } from './all/all.component';
import { AccountsGuideComponent } from './accounts-guide/accounts-guide.component';
import { ImportModule } from '../import/import.module';
import { CostCenterComponent } from './cost-center/cost-center.component';


@NgModule({
  declarations: [
    AllComponent,
    AccountsGuideComponent,
    CostCenterComponent
  ],
  imports: [
    CommonModule,
    AccountsModuleRoutingModule,
    ImportModule
  ]
})
export class AccountsModuleModule { }
