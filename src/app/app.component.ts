import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AccountService } from './account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ERP';

  textDir: string="rtl";
  currentLange !: string;

  collapsed: boolean = false;

 
  constructor(private translate: TranslateService,private accountService:AccountService,private router : Router )
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


  ngOnInit(): void {
    this.loadCurrentUser();
  }

 
  loadCurrentUser(){
    const token = localStorage.getItem('token');
    if(token)
      this.accountService.loadCurrentUser(token).subscribe();
    
    // else{
    // this.router.navigateByUrl('/branch')
    // }
  }
  
// toggleCollapse() {
//   this.collapsed = !this.collapsed;
// }


}
