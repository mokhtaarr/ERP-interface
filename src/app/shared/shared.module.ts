import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CreateTranslateLoader } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FooterComponent } from './footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { CustomSidenavComponent } from './custom-sidenav/custom-sidenav.component';
import { HomeModule } from '../home/home.module';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    NavComponent,
    SideMenuComponent,
    FooterComponent,
    CustomSidenavComponent,
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
          provide: TranslateLoader,
          useFactory: CreateTranslateLoader,
          deps: [HttpClient]
      }
  }),
 
  HomeModule,
  RouterModule,
  NgxSpinnerModule
 
  ],
  exports:[
    
    NavComponent,
    SideMenuComponent,
    FooterComponent,
    CustomSidenavComponent,
    NgxSpinnerModule

  ]
})
export class SharedModule { }
