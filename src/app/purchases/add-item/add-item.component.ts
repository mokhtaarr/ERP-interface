import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DefinitionService } from 'src/app/definition/definition.service';
import { PurchasesServicesService } from '../purchases-services.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
  allItem : any[] = [];
  ItemCollection_Response:any[] = [];
  displayedColumns: string[] = ['ItemCode','ItemDescA','ItemDescE','UnitNam','ItemType'];
 
  dataSource:any;
  exsitingData:any;
 
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
 
 
   constructor(
     @Inject(MAT_DIALOG_DATA) public data: any,
     private ref: MatDialogRef<AddItemComponent>,
     private PurchasesServices: PurchasesServicesService,
     private definitionService: DefinitionService,
     public toastr: ToastrService
   ) {}
 
   ngOnInit(): void {
     this.GetAllItems();
   }
 
 
   GetAllItems(){
     this.PurchasesServices.GetAllItemForPurchasOrderRequest().subscribe(res=>{
       this.allItem = res; 
       this.dataSource = new MatTableDataSource<any>(this.allItem);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
 
     });
   }
 
   getAllItemForSelect(){
   this.definitionService.GetAllItemForItemCollections().subscribe(res=>{
     this.allItem = res;
   })
   }
 
  
   
   Filterchange(data: Event) {
     const value = (data.target as HTMLInputElement).value;
     this.dataSource.filter = value;
   }
 
   
   fillForm(row:any){
    if(this.ItemCollection_Response.includes(row)){
      this.toastr.error(`هذا الصنف  ( ${row.itemDescA} )   موجود من قبل`)
       }else{
        this.ItemCollection_Response.push(row);
        this.toastr.success('تم أضافة الصنف')
 
       }
    }
 
 
    closepopup() {
     this.ref.close(this.ItemCollection_Response);
   }
   
   cancel(){
     this.ref.close();
   }
 }
 