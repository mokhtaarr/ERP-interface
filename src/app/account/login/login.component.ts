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

  disableSumbit:boolean = false
  constructor(private router : Router , private fb : FormBuilder , private accountService : AccountService){ }

  accountForm = this.fb.group({
    firstName : ['',Validators.required],
    password : ['',Validators.required]
  })


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
