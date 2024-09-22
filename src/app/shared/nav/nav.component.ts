import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/account/account.service';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';
import { UserInfo } from '../models/userInfo';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  currentCulture!: string;
  currentLange!:string;
  constructor(public translate : TranslateService,private i18nservice:I18nServicesService,public accountService:AccountService){
    this.currentLange = localStorage.getItem('currentLange') || 'ar';
    this.translate.use(this.currentLange);
  }

  changeCurrentLanguage(lang:string){
    this.translate.use(lang);
    localStorage.setItem('currentLange',lang);
    this.i18nservice.changeLocale(lang);
  }

  logOut(){
    this.accountService.logout();
  }
}
