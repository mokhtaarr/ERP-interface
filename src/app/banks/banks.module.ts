import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BanksRoutingModule } from './banks-routing.module';
import { AllComponent } from './all/all.component';
import { MsLetterOfGuaranteeTypesComponent } from './ms-letter-of-guarantee-types/ms-letter-of-guarantee-types.component';
import { ImportModule } from '../import/import.module';
import { MsLetterOfGuaranteeCategoryComponent } from './ms-letter-of-guarantee-category/ms-letter-of-guarantee-category.component';
import { MsLetterOfGuaranteeStatusComponent } from './ms-letter-of-guarantee-status/ms-letter-of-guarantee-status.component';
import { BanksComponent } from './banks/banks.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { SearchAccountsComponent } from './search-accounts/search-accounts.component';


@NgModule({
  declarations: [
    AllComponent,
    MsLetterOfGuaranteeTypesComponent,
    MsLetterOfGuaranteeCategoryComponent,
    MsLetterOfGuaranteeStatusComponent,
    BanksComponent,
    AddAccountComponent,
    SearchAccountsComponent
  ],
  imports: [
    CommonModule,
    BanksRoutingModule,
    ImportModule
  ]
})
export class BanksModule { }
