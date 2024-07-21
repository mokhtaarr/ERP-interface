import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { DefinitionService } from '../definition.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-item-partition-with-his-store',
  templateUrl: './item-partition-with-his-store.component.html',
  styleUrls: ['./item-partition-with-his-store.component.scss']
})
export class ItemPartitionWithHisStoreComponent implements OnInit {
  allItem : any[] = [];
  Partition_Response:any[] = [];
  displayedColumns: string[] = ['partCode','partDescA','storeCode','storeDescA'];
 
  dataSource:any;
  exsitingData:any;
 
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ItemPartitionWithHisStoreComponent>,
    private definitionService: DefinitionService,
    public toastr: ToastrService
  ) {}

 

  ngOnInit(): void {
    this.GetAllItems()
  }

  GetAllItems(){
    this.definitionService.GetItemPartitionWithHisStore().subscribe(res=>{
      this.allItem = res; 
      this.dataSource = new MatTableDataSource<any>(this.allItem);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  
  fillForm(row:any){
   if(this.Partition_Response.includes(row)){
     this.toastr.error(`هذا المخزن  ( ${row.partDescA} )   موجود من قبل`)
      }else{
       this.Partition_Response.push(row);
       this.toastr.success('تم أضافة المخزن')

      }
  }

  closepopup() {
    this.ref.close(this.Partition_Response);
  }

}
