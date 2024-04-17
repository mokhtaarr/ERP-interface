import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  currentCulture!: string;
  currentLange!:string;
  constructor(public translate : TranslateService,private i18nservice:I18nServicesService){
    this.currentLange = localStorage.getItem('currentLange') || 'ar';
    this.translate.use(this.currentLange);
  }

  changeCurrentLanguage(lang:string){
    this.translate.use(lang);
    localStorage.setItem('currentLange',lang);
    this.i18nservice.changeLocale(lang);
  }
}
