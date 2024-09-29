import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit{

  disableSumbit:boolean = false;
  disableBranches:boolean = true;

  allCompanies:any[] = [];
  constructor(private CompaniesServices:AccountService ,private router : Router , private fb : FormBuilder ,private toastr:ToastrService,private http: HttpClient){

  }
  ngOnInit(): void {
    this.getAllCompanies();
  }

  branchForm = this.fb.group({
    DataBaseId:['',Validators.required]
  })

  onSubmit(){
    this.disableSumbit = true

    this.CompaniesServices.getCompany(this.branchForm.value.DataBaseId).subscribe(res=>{
      if(res.status){
        this.router.navigateByUrl('/login'); 
      }else{
        this.disableSumbit = false
      }
    })    
  }


  getAllCompanies(){
    console.log('getAllCompanies')
    this.CompaniesServices.getAllCompanies().subscribe({
      next: (res) => {
        this.allCompanies = res;
        console.log('allCompanies' ,this.allCompanies)

        this.branchForm.get('DataBaseId')?.setValue(this.allCompanies[0].dataBaseId)
      },
      error: (err) => {
        console.error("Error fetching companies", err);
      },
      complete: () => {
        this.disableBranches = false;
      }
    });
  }
}
