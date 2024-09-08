import { Component, Inject, OnInit } from '@angular/core';
import { BanksService } from '../banks.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-accounts',
  templateUrl: './search-accounts.component.html',
  styleUrls: ['./search-accounts.component.scss']
})
export class SearchAccountsComponent implements OnInit {

  AllAccounts:any[] = [];


  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<SearchAccountsComponent>,
  private BankService: BanksService,private fb: FormBuilder,private dialog: MatDialog){ }
 
 
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  GetAllAccount(){
    this.BankService.GetAllAccounts().subscribe(res=>{
      this.AllAccounts = res;
    })
  }
  
  
}
