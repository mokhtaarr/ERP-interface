import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CreateTranslateLoader } from '../app.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CompanyInfoDialogComponent } from './company-info-dialog/company-info-dialog.component';
import { DialogComponent } from './dialog/dialog.component';
import {Dialog, DialogModule, DialogRef} from '@angular/cdk/dialog';
import { BranchCompanyComponent } from './branch-company/branch-company.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DefinitionComponent } from './definition/definition.component';
import { StoresComponent } from './stores/stores.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { BranchFormComponent } from './branch-form/branch-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    HomeComponent,
    CompanyInfoDialogComponent,
    DialogComponent,
    BranchCompanyComponent,
    ContactUsComponent,
    DefinitionComponent,
    StoresComponent,
    PurchasesComponent,
    BranchFormComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
          provide: TranslateLoader,
          useFactory: CreateTranslateLoader,
          deps: [HttpClient]
      }
  }),
  DragDropModule,
  DialogModule,
  MatCheckboxModule,
  MatSelectModule,


  ],
  exports:[
    HomeComponent,
    DialogComponent,
    BranchCompanyComponent
  ]
})
export class HomeModule { }
