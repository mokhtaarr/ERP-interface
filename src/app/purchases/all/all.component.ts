import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  constructor(public accountService:AccountService){

  }


  ngOnInit(): void {
    // this.getUserInfo();
  }

  
getUserInfo(){
  this.accountService.currentUser$.subscribe(res =>{
     console.log(res)
    })
}

}
