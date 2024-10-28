import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from '../definition.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { UpdateUnitComponent } from '../update-unit/update-unit.component';
import { AddUnitComponent } from '../add-unit/add-unit.component';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-item-units',
  templateUrl: './item-units.component.html',
  styleUrls: ['./item-units.component.scss']
})
export class ItemUnitsComponent implements OnInit{

  dataSource: any;
  displayedColumns: string[] = ['unitCode', 'unitNam', 'unitNameE', 'unittRate'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  AllBasicsUnit: any[] = []
  itemUnitsSub: any[] = []

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

  disableAddUnit:boolean = true;
  newDisable:boolean = false;

  constructor(private definitionService: DefinitionService , private fb:FormBuilder,private dialog: MatDialog,
    public accountService : AccountService){
  }
   

  ngOnInit(): void {
    this.BasicsUnitForm.disable();
    this.GetAllBasicsUnit();
  }

  BasicsUnitForm=this.fb.group({
    basUnitId:[],
    unitCode:['',Validators.required],
    unitNam:['',Validators.required],
    unitNameE:[''],
    unittRate:[],
    etaxUnitCode:[''],
    remarks:[''],
    autoDesc:[''],

  })

  GetAllBasicsUnit(){
    this.definitionService.GetAlBasicUnits().subscribe(res=>{
      this.AllBasicsUnit = res;
      this.dataSource = new MatTableDataSource<any>(this.AllBasicsUnit);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  onSumbit(){
    this.definitionService.AddBasicUnit(this.BasicsUnitForm.value).subscribe(res=>{
      if(res.status){
        this.GetAllBasicsUnit();
        this.BasicsUnitForm.disable();
        this.BasicsUnitForm.get('basUnitId')?.setValue(res.id)
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
      this.BasicsUnitForm.setValue({
        basUnitId: row.basUnitId,
        unitCode: row.unitCode,
        unitNam: row.unitNam,
        unitNameE: row.unitNameE,
        unittRate: row.unittRate,
        etaxUnitCode: row.etaxUnitCode,
        remarks: row.remarks,
        autoDesc: row.autoDesc
      });
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.UndoDisabled = true;
      this.disableAddUnit = false;
      window.scrollTo({ top: 30, behavior: 'smooth' });
      this.getSubUnits(row.basUnitId);
    }
  }

  getFirstRowData(){
    this.AllBasicsUnit = this.dataSource.filteredData
    const FirstItem = this.AllBasicsUnit[0];
      if(FirstItem){
      this.BasicsUnitForm.setValue({
        basUnitId: FirstItem.basUnitId,
        unitCode: FirstItem.unitCode,
        unitNam: FirstItem.unitNam,
        unitNameE: FirstItem.unitNameE,
        unittRate: FirstItem.unittRate,
        etaxUnitCode: FirstItem.etaxUnitCode,
        remarks: FirstItem.remarks,
        autoDesc: FirstItem.autoDesc
      })
      this.disableAddUnit = false;
      this.firstRow = true;
      this.lastRow = false;
      this.DisabledPrevButton = true;
      this.DisabledNextButton = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      }
  }

  getLastRowData(){
    this.AllBasicsUnit = this.dataSource.filteredData
    const LastItem = this.AllBasicsUnit[this.AllBasicsUnit.length-1];
    if(LastItem){
      this.BasicsUnitForm.setValue({
        basUnitId: LastItem.basUnitId,
        unitCode: LastItem.unitCode,
        unitNam: LastItem.unitNam,
        unitNameE: LastItem.unitNameE,
        unittRate: LastItem.unittRate,
        etaxUnitCode: LastItem.etaxUnitCode,
        remarks: LastItem.remarks,
        autoDesc: LastItem.autoDesc
      })
    this.disableAddUnit = false;
    this.firstRow = false;
    this.lastRow = true;
    this.DisabledPrevButton = false;
    this.DisabledNextButton = true;
    this.UpdateDisable = false;
    this.DeleteDisable = false;

    }
  }

  getPrevRowData(){
    this.AllBasicsUnit = this.dataSource.filteredData;
      const index = this.AllBasicsUnit.findIndex(p=>p.basUnitId == this.BasicsUnitForm.value.basUnitId);
  
      const PrevItem = this.AllBasicsUnit[index - 1];
  
      if(PrevItem){
     this.BasicsUnitForm.setValue({
      basUnitId: PrevItem.basUnitId,
      unitCode: PrevItem.unitCode,
      unitNam: PrevItem.unitNam,
      unitNameE: PrevItem.unitNameE,
      unittRate: PrevItem.unittRate,
      etaxUnitCode: PrevItem.etaxUnitCode,
      remarks: PrevItem.remarks,
      autoDesc: PrevItem.autoDesc
     })
        this.disableAddUnit = false;
        this.firstRow = false;
        this.lastRow = false;
        this.UpdateDisable = false;
        this.DeleteDisable = false;
  
  
        const firstItem = this.AllBasicsUnit.findIndex(p=>p.basUnitId == this.BasicsUnitForm.value.basUnitId);
  
         if(firstItem === 0){
              this.DisabledPrevButton = true;
              this.firstRow = true;
         }
         
       
        this.DisabledNextButton = false;
  
      }
  }

  getNextRowData(){
    this.AllBasicsUnit = this.dataSource.filteredData;

      const index = this.AllBasicsUnit.findIndex(p=>p.basUnitId == this.BasicsUnitForm.value.basUnitId);
  
      const nextItem = this.AllBasicsUnit[index + 1];
  
      if(nextItem){
       this.BasicsUnitForm.setValue({
        basUnitId: nextItem.basUnitId,
        unitCode: nextItem.unitCode,
        unitNam: nextItem.unitNam,
        unitNameE: nextItem.unitNameE,
        unittRate: nextItem.unittRate,
        etaxUnitCode: nextItem.etaxUnitCode,
        remarks: nextItem.remarks,
        autoDesc: nextItem.autoDesc
       })
       this.disableAddUnit = false;
        this.firstRow = false;
        this.UpdateDisable = false;
        this.DeleteDisable = false;

        const LastItem = this.AllBasicsUnit.findIndex(p=>p.basUnitId == this.BasicsUnitForm.value.basUnitId);
  
        if(this.AllBasicsUnit.length -1 === LastItem){
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
        this.definitionService.DeleteBasicUnit(this.BasicsUnitForm.value.basUnitId).subscribe(res=>{
          if(res){
            this.GetAllBasicsUnit();
            this.BasicsUnitForm.setValue({
              basUnitId: null,
              unitCode: null,
              unitNam: null,
              unitNameE: null,
              unittRate: null,
              etaxUnitCode: null,
              remarks: null,
              autoDesc: null
            })

            this.DeleteDisable = true;
            this.UpdateDisable = true;
            
          }
        })
           
      }
    });
  }

  undo(){
    this.BasicsUnitForm.disable();
    this.DisabledNextButton = false;
    this.DisabledPrevButton = false;
    this.lastRow = false;
    this.firstRow = false;
    this.reloadDisabled = false;
    this.SaveDisable = true;
    this.UndoDisabled = true;
    this.newDisable = false;

    if(this.undoIndex != -1){
      const undoItem = this.AllBasicsUnit[this.undoIndex]

      if(undoItem){
       this.BasicsUnitForm.setValue({
        basUnitId: undoItem.basUnitId,
        unitCode: undoItem.unitCode,
        unitNam: undoItem.unitNam,
        unitNameE: undoItem.unitNameE,
        unittRate: undoItem.unittRate,
        etaxUnitCode: undoItem.etaxUnitCode,
        remarks: undoItem.remarks,
        autoDesc: undoItem.autoDesc
       })

      this.UpdateDisable = false;
      this.DeleteDisable = false;
     }
    }
  }



  updateBasicUint(){
    this.BasicsUnitForm.enable();
    this.DeleteDisable = true;
    this.newDisable = true;
    this.DisabledNextButton = true;
    this.DisabledPrevButton = true;
    this.lastRow = true;
    this.firstRow = true;
    this.SaveDisable = false;
    this.EditReadonly = true;
    this.reloadDisabled = false;
    this.UpdateDisable = true;
    this.UndoDisabled = false;
    this.AllBasicsUnit = this.dataSource.filteredData;
    this.undoIndex = this.AllBasicsUnit.findIndex(p=>p.basUnitId == this.BasicsUnitForm.value.basUnitId);
  }
 
  New(){
    this.BasicsUnitForm.enable();
    this.AllBasicsUnit = this.dataSource.filteredData;
    this.undoIndex = this.AllBasicsUnit.findIndex(p=>p.basUnitId == this.BasicsUnitForm.value.basUnitId);
   this.BasicsUnitForm.setValue({
     basUnitId: null,
     unitCode: null,
     unitNam: null,
     unitNameE: null,
     unittRate: null,
     etaxUnitCode: null,
     remarks: null,
     autoDesc: null
   })
    this.newDisable = true;
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
    this.disableAddUnit = true;

  }
  

  // السيرفسيس الخاصه بالوحدات الفرعيه للوحده الاساسية
  
  getSubUnits(basUnitId:any){
    this.definitionService.GetItemUnitSub(basUnitId).subscribe(res=>{
      this.itemUnitsSub = res
    })
  }


  updateUnit(itemUnit:any){
    var _popup = this.dialog.open(UpdateUnitComponent, {
      width: '90%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        Title: 'تعديل وحده',
        itemUnitData : itemUnit,
        basicId : this.BasicsUnitForm.value.basUnitId
      },
    });
    _popup.afterClosed().subscribe((response) => {
      if(response){
           this.getSubUnits(response);
      }
    });
  }

DeleteUnit(basUnitId:any){
    var _popup = this.dialog.open(DeleteConfirmComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
    _popup.afterClosed().subscribe((response) => {
      if (response) {
        this.definitionService.DeleteUnit(basUnitId).subscribe(res=>{
          if(res){
            this.getSubUnits(this.BasicsUnitForm.value.basUnitId);
           
          }
        })
           
      }
    });
  }

  AddUnit(){
    var _popup = this.dialog.open(AddUnitComponent, {
      width: '90%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        Title: 'أضافة وحده',
        ParentUnitId : this.BasicsUnitForm.value.basUnitId,
        ParentName : this.BasicsUnitForm.value.unitNam
      },
    });
    _popup.afterClosed().subscribe((response) => {
      if(response){
           this.getSubUnits(response);
      }
    });
  }
}

