import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from '../definition.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-customer-types',
  templateUrl: './customer-types.component.html',
  styleUrls: ['./customer-types.component.scss']
})
export class CustomerTypesComponent implements OnInit{

  dataSource: any;
  displayedColumns: string[] = ['customerTypeCode', 'customerTypeDescA', 'customerTypeDescE', 'name_CustomerTypeParent',
    'customerTypeLevelType','remarks'];

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  AllCustomerType : any[] = [];
  AllCustomerTypeSelect : any[] = [];

  DisabledPrevButton: boolean = false;
  DisabledNextButton: boolean = false;
  firstRow: boolean = false;
  lastRow: boolean = false;
  DeleteDisable :boolean = true;
  SaveDisable : boolean = true;
  UpdateDisable : boolean = true;

  EditReadonly : boolean = false;
  reloadDisabled : boolean = false;
  UndoDisabled : boolean = true;
  undoIndex!: number;

  constructor(private definitionService: DefinitionService , private fb:FormBuilder,private dialog: MatDialog){
  }
   

  ngOnInit(): void {
    this.customerTypeForm.disable();
    this.GetAllCustomerType();
  }

  customerTypeForm = this.fb.group({
    customerTypeId :[],
    customerTypeCode:['',Validators.required],
    customerTypeDescA:['',Validators.required],
    customerTypeDescE:['',Validators.required],
    customerTypeParent:[],
    customerTypeLevel:[],
    customerTypeLevelType:[''],
    remarks:['']

  })

  GetAllCustomerType(){
   this.definitionService.GetAllCustomerType().subscribe(res=>{
    this.AllCustomerType = res;
    this.AllCustomerTypeSelect = res;
    this.dataSource = new MatTableDataSource<any>(this.AllCustomerType);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   })
  }

  onSumbit(){
    this.definitionService.AddCustomerType(this.customerTypeForm.value).subscribe(res=>{
      if(res.status){
        this.GetAllCustomerType();
        this.customerTypeForm.disable();
        this.customerTypeForm.get('customerTypeId')?.setValue(res.id)
        this.DisabledNextButton = false;
        this.DisabledPrevButton = false;
        this.lastRow = false;
        this.firstRow = false;
        this.SaveDisable=true;
        this.UpdateDisable = false;
        this.UndoDisabled = true;
        this.DeleteDisable=false;

      }
    })
  }

  fillForm(row:any){
    if(row){
      this.customerTypeForm.setValue({
        customerTypeId: row.customerTypeId,
        customerTypeCode: row.customerTypeCode,
        customerTypeDescA: row.customerTypeDescA,
        customerTypeDescE: row.customerTypeDescE,
        customerTypeParent: row.customerTypeParent,
        customerTypeLevel: row.customerTypeLevel,
        customerTypeLevelType: row.customerTypeLevelType,
        remarks: row.remarks
      });
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.UndoDisabled = true;
      window.scrollTo({ top: 30, behavior: 'smooth' });
    }
  }

  getFirstRowData(){
    this.AllCustomerType = this.dataSource.filteredData
    const FirstItem = this.AllCustomerType[0];
      if(FirstItem){
      this.customerTypeForm.setValue({
        customerTypeId: FirstItem.customerTypeId,
        customerTypeCode: FirstItem.customerTypeCode,
        customerTypeDescA: FirstItem.customerTypeDescA,
        customerTypeDescE: FirstItem.customerTypeDescE,
        customerTypeParent: FirstItem.customerTypeParent,
        customerTypeLevel: FirstItem.customerTypeLevel,
        customerTypeLevelType: FirstItem.customerTypeLevelType,
        remarks: FirstItem.remarks
      })
  
      this.firstRow = true;
      this.lastRow = false;
      this.DisabledPrevButton = true;
      this.DisabledNextButton = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      }
  }


  getLastRowData(){
    this.AllCustomerType = this.dataSource.filteredData
    const LastItem = this.AllCustomerType[this.AllCustomerType.length-1];
    if(LastItem){
      this.customerTypeForm.setValue({
        customerTypeId: LastItem.customerTypeId,
        customerTypeCode: LastItem.customerTypeCode,
        customerTypeDescA: LastItem.customerTypeDescA,
        customerTypeDescE: LastItem.customerTypeDescE,
        customerTypeParent: LastItem.customerTypeParent,
        customerTypeLevel: LastItem.customerTypeLevel,
        customerTypeLevelType: LastItem.customerTypeLevelType,
        remarks: LastItem.remarks
      })

    this.firstRow = false;
    this.lastRow = true;
    this.DisabledPrevButton = false;
    this.DisabledNextButton = true;
    this.UpdateDisable = false;
    this.DeleteDisable = false;

    }
  }

  getPrevRowData(){
    this.AllCustomerType = this.dataSource.filteredData;

      const index = this.AllCustomerType.findIndex(p=>p.customerTypeId == this.customerTypeForm.value.customerTypeId);
  
      const PrevItem = this.AllCustomerType[index - 1];
  
      if(PrevItem){
     this.customerTypeForm.setValue({
       customerTypeId: PrevItem.customerTypeId,
       customerTypeCode: PrevItem.customerTypeCode,
       customerTypeDescA: PrevItem.customerTypeDescA,
       customerTypeDescE: PrevItem.customerTypeDescE,
       customerTypeParent: PrevItem.customerTypeParent,
       customerTypeLevel: PrevItem.customerTypeLevel,
       customerTypeLevelType: PrevItem.customerTypeLevelType,
       remarks: PrevItem.remarks
     })

        this.firstRow = false;
        this.lastRow = false;
        this.UpdateDisable = false;
        this.DeleteDisable = false;
  
  
        const firstItem = this.AllCustomerType.findIndex(p=>p.customerTypeId == this.customerTypeForm.value.customerTypeId);
  
         if(firstItem === 0){
              this.DisabledPrevButton = true;
              this.firstRow = true;
         }
         
       
        this.DisabledNextButton = false;
  
      }
  }

  getNextRowData(){
    this.AllCustomerType = this.dataSource.filteredData;

      const index = this.AllCustomerType.findIndex(p=>p.customerTypeId == this.customerTypeForm.value.customerTypeId);
  
      const nextItem = this.AllCustomerType[index + 1];
  
      if(nextItem){
       this.customerTypeForm.setValue({
         customerTypeId: nextItem.customerTypeId,
         customerTypeCode: nextItem.customerTypeCode,
         customerTypeDescA: nextItem.customerTypeDescA,
         customerTypeDescE: nextItem.customerTypeDescE,
         customerTypeParent: nextItem.customerTypeParent,
         customerTypeLevel: nextItem.customerTypeLevel,
         customerTypeLevelType: nextItem.customerTypeLevelType,
         remarks: nextItem.remarks
       })
        
        this.firstRow = false;
        this.UpdateDisable = false;
        this.DeleteDisable = false;

        const LastItem = this.AllCustomerType.findIndex(p=>p.customerTypeId == this.customerTypeForm.value.customerTypeId);
  
        if(this.AllCustomerType.length -1 === LastItem){
          this.DisabledNextButton = true;
          this.lastRow = true;
  
        }
  
        this.DisabledPrevButton = false;
  
      }
  }


  Open_delete_confirm(){
    var _popup = this.dialog.open(DeleteConfirmComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
    _popup.afterClosed().subscribe((response) => {
      if (response) {
        this.definitionService.DeleteCustomerType(this.customerTypeForm.value.customerTypeId).subscribe(res=>{
          if(res){
            this.GetAllCustomerType();
            this.customerTypeForm.setValue({
              customerTypeId: null,
              customerTypeCode: null,
              customerTypeDescA: null,
              customerTypeDescE: null,
              customerTypeParent: null,
              customerTypeLevel: null,
              customerTypeLevelType: null,
              remarks: null
            })

            this.DeleteDisable = true;
            this.UpdateDisable = true;
            
          }
        })
           
      }
    });
  }


  undo(){
    this.customerTypeForm.disable();
    this.DisabledNextButton = false;
    this.DisabledPrevButton = false;
    this.lastRow = false;
    this.firstRow = false;
    this.reloadDisabled = false;
    this.SaveDisable = true;
    this.UndoDisabled = true;

    if(this.undoIndex != -1){
      const undoItem = this.AllCustomerType[this.undoIndex]

      if(undoItem){
       this.customerTypeForm.setValue({
         customerTypeId: undoItem.customerTypeId,
         customerTypeCode: undoItem.customerTypeCode,
         customerTypeDescA: undoItem.customerTypeDescA,
         customerTypeDescE: undoItem.customerTypeDescE,
         customerTypeParent: undoItem.customerTypeParent,
         customerTypeLevel: undoItem.customerTypeLevel,
         customerTypeLevelType: undoItem.customerTypeLevelType,
         remarks: undoItem.remarks
       })
      this.DeleteDisable = false;
      this.UpdateDisable = false;
     }
    }
  }

  updatecustomerType(){
    this.customerTypeForm.enable();
    this.DeleteDisable = true;
    this.DisabledNextButton = true;
    this.DisabledPrevButton = true;
    this.lastRow = true;
    this.firstRow = true;
    this.SaveDisable = false;
    this.EditReadonly = true;
    this.reloadDisabled = false;
    this.UpdateDisable = true;
    this.UndoDisabled = false;
    this.AllCustomerType = this.dataSource.filteredData;
    this.undoIndex = this.AllCustomerType.findIndex(p=>p.customerTypeId == this.customerTypeForm.value.customerTypeId);
  }

  New(){
    this.customerTypeForm.enable();
    this.AllCustomerType = this.dataSource.filteredData;
    this.undoIndex = this.AllCustomerType.findIndex(p=>p.customerTypeId == this.customerTypeForm.value.customerTypeId);
   this.customerTypeForm.setValue({
     customerTypeId: null,
     customerTypeCode: null,
     customerTypeDescA: null,
     customerTypeDescE: null,
     customerTypeParent: null,
     customerTypeLevel: null,
     customerTypeLevelType: null,
     remarks: null
   })
  
    this.DisabledNextButton = true;
    this.DisabledPrevButton = true;
    this.lastRow = true;
    this.firstRow = true;
    this.UpdateDisable = true;
    this.SaveDisable = false;
    this.EditReadonly = false;
    this.reloadDisabled = true;
    this.DeleteDisable = true;
    this.UndoDisabled = false;
  }
  
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
 
}

