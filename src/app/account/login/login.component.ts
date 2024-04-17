import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router : Router , private toastr : ToastrService){ }

  onSubmit(){
    this.toastr.success("تم تسجيل الدخول بنجاح");
     this.router.navigateByUrl('/main/home');
  }
}
