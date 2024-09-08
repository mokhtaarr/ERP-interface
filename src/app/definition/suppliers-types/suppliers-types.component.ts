import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from '../definition.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-suppliers-types',
  templateUrl: './suppliers-types.component.html',
  styleUrls: ['./suppliers-types.component.scss']
})
export class SuppliersTypesComponent implements OnInit  {

  AllVendorTypes : any[] = [];
  AllVendorTypesSelect : any[] = [];
  readonlyTable : boolean = false;
  newDisable:boolean = false;
  dataSource: any;
  displayedColumns: string[] = ['vendorTypeCode', 'vendorTypeDescA', 'vendorTypeDescE','name_VendorTypeParent','vendorTypeLevelType','remarks'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

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
    this.vendorTypeForm.disable();
    this.getAllVendorTypes();
  }


  vendorTypeForm = this.fb.group({
    vendorTypeId:[],
    vendorTypeCode:['',Validators.required],
    vendorTypeDescA:['',Validators.required],
    vendorTypeDescE:[''],
    vendorTypeParent:[''],
    vendorTypeLevel:[''],
    vendorTypeLevelType:[''],
    remarks:['']
  })

 

  getAllVendorTypes(){
    this.definitionService.GetAllVandorType().subscribe(res=>{
      this.AllVendorTypes = res;
      this.AllVendorTypesSelect = res;
      this.dataSource = new MatTableDataSource<any>(this.AllVendorTypes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  fillForm(row:any){
    if(row){
      this.vendorTypeForm.setValue({
        vendorTypeId: row.vendorTypeId,
        vendorTypeCode: row.vendorTypeCode,
        vendorTypeDescA: row.vendorTypeDescA,
        vendorTypeDescE: row.vendorTypeDescE,
        vendorTypeParent: row.vendorTypeParent,
        vendorTypeLevel: row.vendorTypeLevel,
        vendorTypeLevelType: row.vendorTypeLevelType,
        remarks: row.remarks
      });
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.UndoDisabled = true;
      window.scrollTo({ top: 30, behavior: 'smooth' });

    }
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  onSumbit(){
    this.definitionService.AddVendorType(this.vendorTypeForm.value).subscribe(res=>{
      if(res){
        this.getAllVendorTypes();
        this.vendorTypeForm.disable();
        this.DisabledNextButton = false;
        this.DisabledPrevButton = false;
        this.lastRow = false;
        this.firstRow = false;
        this.SaveDisable=true;
        this.UpdateDisable = false;
        this.UndoDisabled = true;

      }
    })
  }

  Open_delete_confirm() {
    var _popup = this.dialog.open(DeleteConfirmComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
    _popup.afterClosed().subscribe((response) => {
      if (response) {
        this.definitionService.DeleteVendorType(this.vendorTypeForm.value.vendorTypeId).subscribe(res=>{
          if(res){
            this.getAllVendorTypes();
            this.vendorTypeForm.setValue({
              vendorTypeId: null,
              vendorTypeCode: null,
              vendorTypeDescA: null,
              vendorTypeDescE: null,
              vendorTypeParent: null,
              vendorTypeLevel: null,
              vendorTypeLevelType: null,
              remarks: null
            })

            this.DeleteDisable = true;
            this.UpdateDisable = true;
          }
        })
           
      }
    });
  }

 New(){
  this.vendorTypeForm.enable();
  this.readonlyTable = true;
  this.newDisable = true;
  this.AllVendorTypes = this.dataSource.filteredData;
  this.undoIndex = this.AllVendorTypes.findIndex(p=>p.vendorTypeId == this.vendorTypeForm.value.vendorTypeId);
  this.vendorTypeForm.setValue({
    vendorTypeId: null,
    vendorTypeCode: null,
    vendorTypeDescA: null,
    vendorTypeDescE: null,
    vendorTypeParent: null,
    vendorTypeLevel: null,
    vendorTypeLevelType: null,
    remarks: null
  });

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

   getFirstRowData() {
    this.AllVendorTypes = this.dataSource.filteredData
      const FirstItem = this.AllVendorTypes[0];
        if(FirstItem){
       this.vendorTypeForm.setValue({
         vendorTypeId: FirstItem.vendorTypeId,
         vendorTypeCode: FirstItem.vendorTypeCode,
         vendorTypeDescA: FirstItem.vendorTypeDescA,
         vendorTypeDescE: FirstItem.vendorTypeDescE,
         vendorTypeParent: FirstItem.vendorTypeParent,
         vendorTypeLevel: FirstItem.vendorTypeLevel,
         vendorTypeLevelType: FirstItem.vendorTypeLevelType,
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

    getLastRowData() {
      this.AllVendorTypes = this.dataSource.filteredData
      const LastItem = this.AllVendorTypes[this.AllVendorTypes.length-1];
      if(LastItem){
     this.vendorTypeForm.setValue({
       vendorTypeId: LastItem.vendorTypeId,
       vendorTypeCode: LastItem.vendorTypeCode,
       vendorTypeDescA: LastItem.vendorTypeDescA,
       vendorTypeDescE: LastItem.vendorTypeDescE,
       vendorTypeParent: LastItem.vendorTypeParent,
       vendorTypeLevel: LastItem.vendorTypeLevel,
       vendorTypeLevelType: LastItem.vendorTypeLevelType,
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

    

    getPrevRowData() {
      this.AllVendorTypes = this.dataSource.filteredData;

      const index = this.AllVendorTypes.findIndex(p=>p.vendorTypeId == this.vendorTypeForm.value.vendorTypeId);
  
      const PrevItem = this.AllVendorTypes[index - 1];
  
      if(PrevItem){
      this.vendorTypeForm.setValue({
        vendorTypeId: PrevItem.vendorTypeId,
        vendorTypeCode: PrevItem.vendorTypeCode,
        vendorTypeDescA: PrevItem.vendorTypeDescA,
        vendorTypeDescE: PrevItem.vendorTypeDescE,
        vendorTypeParent: PrevItem.vendorTypeParent,
        vendorTypeLevel: PrevItem.vendorTypeLevel,
        vendorTypeLevelType: PrevItem.vendorTypeLevelType,
        remarks: PrevItem.remarks
      })
        this.firstRow = false;
        this.lastRow = false;
        this.UpdateDisable = false;
        this.DeleteDisable = false;
  
  
        const firstItem = this.AllVendorTypes.findIndex(p=>p.vendorTypeId == this.vendorTypeForm.value.vendorTypeId);
  
         if(firstItem === 0){
              this.DisabledPrevButton = true;
              this.firstRow = true;
         }
         
       
        this.DisabledNextButton = false;
  
      }
    }

    getNextRowData() {
      this.AllVendorTypes = this.dataSource.filteredData;

      const index = this.AllVendorTypes.findIndex(p=>p.vendorTypeId == this.vendorTypeForm.value.vendorTypeId);
  
      const nextItem = this.AllVendorTypes[index + 1];
  
      if(nextItem){
       this.vendorTypeForm.setValue({
         vendorTypeId: nextItem.vendorTypeId,
         vendorTypeCode: nextItem.vendorTypeCode,
         vendorTypeDescA: nextItem.vendorTypeDescA,
         vendorTypeDescE: nextItem.vendorTypeDescE,
         vendorTypeParent: nextItem.vendorTypeParent,
         vendorTypeLevel: nextItem.vendorTypeLevel,
         vendorTypeLevelType: nextItem.vendorTypeLevelType,
         remarks: nextItem.remarks
       })
        
        this.firstRow = false;
        this.UpdateDisable = false;
        this.DeleteDisable = false;

        const LastItem = this.AllVendorTypes.findIndex(p=>p.vendorTypeId == this.vendorTypeForm.value.vendorTypeId);
  
        if(this.AllVendorTypes.length -1 === LastItem){
          this.DisabledNextButton = true;
          this.lastRow = true;
  
        }
  
        this.DisabledPrevButton = false;
  
      }
    }

   
  
    undo() {
      this.vendorTypeForm.disable();
      this.DisabledNextButton = false;
      this.DisabledPrevButton = false;
      this.lastRow = false;
      this.firstRow = false;
      this.reloadDisabled = false;
      this.SaveDisable = true;
      this.UndoDisabled = true;
      this.readonlyTable = false;
      this.newDisable = false;

      if(this.undoIndex != -1){
        const undoItem = this.AllVendorTypes[this.undoIndex]

        if(undoItem){
         this.vendorTypeForm.setValue({
           vendorTypeId: undoItem.vendorTypeId,
           vendorTypeCode: undoItem.vendorTypeCode,
           vendorTypeDescA: undoItem.vendorTypeDescA,
           vendorTypeDescE: undoItem.vendorTypeDescE,
           vendorTypeParent: undoItem.vendorTypeParent,
           vendorTypeLevel: undoItem.vendorTypeLevel,
           vendorTypeLevelType: undoItem.vendorTypeLevelType,
           remarks: undoItem.remarks
         });

        this.UpdateDisable = false;
        this.DeleteDisable = false;
        }
        
     
    }

   
  }
  
  updateVendorType(){
      this.vendorTypeForm.enable();
      this.readonlyTable = true;
      this.newDisable = true;
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
      this.AllVendorTypes = this.dataSource.filteredData;
      this.undoIndex = this.AllVendorTypes.findIndex(p=>p.vendorTypeId == this.vendorTypeForm.value.vendorTypeId);
  }
 
}

