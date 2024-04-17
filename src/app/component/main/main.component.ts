import { Component } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  textDir: string="rtl";
  currentLange !: string;

  collapsed: boolean = false;

 
  constructor(private translate: TranslateService)
  {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
    {   
      if(translate.currentLang == 'ar')
      {
        this.textDir = 'ltr';
      }else{
        this.textDir = 'rtl';
      }
    });
  }
  toggleCollapse(){
    this.collapsed = !this.collapsed;

  }

}
