import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { MsLetterOfGuaranteeTypesComponent } from './ms-letter-of-guarantee-types/ms-letter-of-guarantee-types.component';
import { MsLetterOfGuaranteeCategoryComponent } from './ms-letter-of-guarantee-category/ms-letter-of-guarantee-category.component';
import { MsLetterOfGuaranteeStatusComponent } from './ms-letter-of-guarantee-status/ms-letter-of-guarantee-status.component';
import { BanksComponent } from './banks/banks.component';

const routes: Routes = [
  {path:'',component:AllComponent},
  {path:'Letter-OfGuarantee-Types',component:MsLetterOfGuaranteeTypesComponent},
  {path:'Letter-Of-Guarantee-Category',component:MsLetterOfGuaranteeCategoryComponent},
  {path:'Letter-Of-Guarantee-Status',component:MsLetterOfGuaranteeStatusComponent},
  {path:'banks',component:BanksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanksRoutingModule { }
