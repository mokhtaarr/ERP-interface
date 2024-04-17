import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent {


  constructor(private router : Router , private toastr : ToastrService){
    
  }

  onSubmit(){
    this.toastr.success("تم اختيار الشركه بنجاح");
     this.router.navigateByUrl('/login');
  }
}
