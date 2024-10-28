import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DefinitionService } from 'src/app/definition/definition.service';
import { PurchasesServicesService } from 'src/app/purchases/purchases-services.service';
import { AccountsModuleServicesService } from '../accounts-module-services.service';

@Component({
  selector: 'app-all-search-accounts',
  templateUrl: './all-search-accounts.component.html',
  styleUrls: ['./all-search-accounts.component.scss']
})
export class AllSearchAccountsComponent {
  allAccounts : any[] = [];
  ItemCollection_Response:any[] = [];
  displayedColumns: string[] = ['accountCode','accountNameA','accDesc','currencyCode','currencyDescA'];
 
  dataSource:any;
  exsitingData:any;
 
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
 
 
   constructor(
     @Inject(MAT_DIALOG_DATA) public data: any,
     private ref: MatDialogRef<AllSearchAccountsComponent>,
     private PurchasesServices: PurchasesServicesService,
     private definitionService: DefinitionService,
     public toastr: ToastrService,
     private accountModuleService : AccountsModuleServicesService
   ) {}
 
   ngOnInit(): void {
     this.GetAllAccounts();
   }
 
 
   GetAllAccounts(){
     this.accountModuleService.GetAllSearchAccounts().subscribe(res=>{
       this.allAccounts = res; 
       this.dataSource = new MatTableDataSource<any>(this.allAccounts);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
 
     });
   }
 
 
  
   
   Filterchange(data: Event) {
     const value = (data.target as HTMLInputElement).value;
     this.dataSource.filter = value;
   }
 
   
   fillForm(row:any){
    if(this.ItemCollection_Response.includes(row)){
      this.toastr.error(`هذا الحساب  ( ${row.accountNameA} )   موجود من قبل`)
       }else{
        this.ItemCollection_Response.push(row);
        this.toastr.success('تم أضافة الحساب')
 
       }
    }
 
 
    closepopup() {
     this.ref.close(this.ItemCollection_Response);
   }
   
   cancel(){
     this.ref.close();
   }
}
