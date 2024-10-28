import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  disableSumbit:boolean = false;
  disableStoresButton:boolean = false;
  disableSumbitButton:boolean = true;
  
  AllStores:any[]=[];
  constructor(private router : Router , private fb : FormBuilder , private accountService : AccountService){ }

  accountForm = this.fb.group({
    userName : ['',Validators.required],
    password : ['',Validators.required],
    storeId:[]
  })


  getStores(){
    if(this.accountForm.get('userName')?.value && this.accountForm.get('password')?.value) 
      {
        this.disableStoresButton = true;
        this.accountService.getAllStores(this.accountForm.value).subscribe({
          next: (res) => {
            this.AllStores = res?.data;
            if(this.AllStores?.length > 0){
              this.accountForm.get('storeId')?.setValue(this.AllStores[0].storeId)
            }
            this.disableStoresButton = false;
          },
          error: (err) => {
            this.disableStoresButton = false;
          },
          complete: () => {
            this.disableSumbitButton = false;
            this.disableStoresButton = false;
          }
        });
      }
  }

  onSubmit(){
    this.disableSumbit = true
    this.accountService.login(this.accountForm.value).subscribe(res=>{
      if(res.status == true){
          this.router.navigateByUrl('/main/home');
      }

      if(res.status == false){
        this.disableSumbit = false
      }
    })
  }

  
}
