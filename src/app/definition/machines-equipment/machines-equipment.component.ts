import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from '../definition.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-machines-equipment',
  templateUrl: './machines-equipment.component.html',
  styleUrls: ['./machines-equipment.component.scss']
})
export class MachinesEquipmentComponent implements OnInit{

  dataSource: any;
  displayedColumns: string[] = 
  ['equipCode', 'equipName1', 'equipName2', 'jdesc','remarks'];
  
  // 'timeRate','standardMonthlyCost','standardHolyDays','standardDailyCost','standardDailyWorkHours','standardHourlyCost','numberAvailable'
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ALLprodEquipments : any[] = [];

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
    this.ProdEquipmentsForm.disable();
    this.getAllProdEquipments();
  }

ProdEquipmentsForm = this.fb.group({
  equipId : [],
  equipCode:[''],
  equipName1:[''],
  equipName2:[''],
  jdesc:[''],
  remarks:[''],
  maxWeight:[],
  minWeight:[],
  timeRate:[''],
  standardMonthlyCost:[],
  standardHolyDays:[],
  standardDailyCost:[],
  standardDailyWorkHours:[],
  standardHourlyCost:[],
  numberAvailable:[],
  isScaleBoolean:[]
})

  getAllProdEquipments(){
    return this.definitionService.GetAllProdEquipments().subscribe(res=>{
      this.ALLprodEquipments = res;
      this.dataSource = new MatTableDataSource<any>(this.ALLprodEquipments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  onSumbit(){
    this.definitionService.AddProdEquipment(this.ProdEquipmentsForm.value).subscribe(res=>{
      if(res.status){
        this.getAllProdEquipments();
        this.ProdEquipmentsForm.disable();
        this.ProdEquipmentsForm.get('equipId')?.setValue(res.id)
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
      this.ProdEquipmentsForm.setValue({
        equipId: row.equipId,
        equipCode: row.equipCode,
        equipName1: row.equipName1,
        equipName2: row.equipName2,
        jdesc: row.jdesc,
        remarks: row.remarks,
        maxWeight: row.maxWeight,
        minWeight: row.minWeight,
        timeRate: row.timeRate,
        standardMonthlyCost: row.standardMonthlyCost,
        standardHolyDays: row.standardHolyDays,
        standardDailyCost: row.standardDailyCost,
        standardDailyWorkHours: row.standardDailyWorkHours,
        standardHourlyCost: row.standardHourlyCost,
        numberAvailable: row.numberAvailable,
        isScaleBoolean: row.isScale
      });
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.UndoDisabled = true;
      window.scrollTo({ top: 30, behavior: 'smooth' });
    }
  }
  

  updateProdEquipment(){
    this.ProdEquipmentsForm.enable();
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
    this.ALLprodEquipments = this.dataSource.filteredData;
    this.undoIndex = this.ALLprodEquipments.findIndex(p=>p.equipId == this.ProdEquipmentsForm.value.equipId);
  }

  getFirstRowData(){
    this.ALLprodEquipments = this.dataSource.filteredData
    const FirstItem = this.ALLprodEquipments[0];
      if(FirstItem){
      this.ProdEquipmentsForm.setValue({
        equipId: FirstItem.equipId,
        equipCode: FirstItem.equipCode,
        equipName1: FirstItem.equipName1,
        equipName2: FirstItem.equipName2,
        jdesc: FirstItem.jdesc,
        remarks: FirstItem.remarks,
        maxWeight: FirstItem.maxWeight,
        minWeight: FirstItem.minWeight,
        timeRate: FirstItem.timeRate,
        standardMonthlyCost: FirstItem.standardMonthlyCost,
        standardHolyDays: FirstItem.standardHolyDays,
        standardDailyCost: FirstItem.standardDailyCost,
        standardDailyWorkHours: FirstItem.standardDailyWorkHours,
        standardHourlyCost: FirstItem.standardHourlyCost,
        numberAvailable: FirstItem.numberAvailable,
        isScaleBoolean: FirstItem.isScale
      });
      this.firstRow = true;
      this.lastRow = false;
      this.DisabledPrevButton = true;
      this.DisabledNextButton = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      }
  }

  getLastRowData(){
    this.ALLprodEquipments = this.dataSource.filteredData
    const LastItem = this.ALLprodEquipments[this.ALLprodEquipments.length-1];
    if(LastItem){
      this.ProdEquipmentsForm.setValue({
        equipId: LastItem.equipId,
        equipCode: LastItem.equipCode,
        equipName1: LastItem.equipName1,
        equipName2: LastItem.equipName2,
        jdesc: LastItem.jdesc,
        remarks: LastItem.remarks,
        maxWeight: LastItem.maxWeight,
        minWeight: LastItem.minWeight,
        timeRate: LastItem.timeRate,
        standardMonthlyCost: LastItem.standardMonthlyCost,
        standardHolyDays: LastItem.standardHolyDays,
        standardDailyCost: LastItem.standardDailyCost,
        standardDailyWorkHours: LastItem.standardDailyWorkHours,
        standardHourlyCost: LastItem.standardHourlyCost,
        numberAvailable: LastItem.numberAvailable,
        isScaleBoolean: LastItem.isScale
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
    this.ALLprodEquipments = this.dataSource.filteredData;

      const index = this.ALLprodEquipments.findIndex(p=>p.equipId == this.ProdEquipmentsForm.value.equipId);
  
      const PrevItem = this.ALLprodEquipments[index - 1];
  
      if(PrevItem){
        this.ProdEquipmentsForm.setValue({
          equipId: PrevItem.equipId,
          equipCode: PrevItem.equipCode,
          equipName1: PrevItem.equipName1,
          equipName2: PrevItem.equipName2,
          jdesc: PrevItem.jdesc,
          remarks: PrevItem.remarks,
          maxWeight: PrevItem.maxWeight,
          minWeight: PrevItem.minWeight,
          timeRate: PrevItem.timeRate,
          standardMonthlyCost: PrevItem.standardMonthlyCost,
          standardHolyDays: PrevItem.standardHolyDays,
          standardDailyCost: PrevItem.standardDailyCost,
          standardDailyWorkHours: PrevItem.standardDailyWorkHours,
          standardHourlyCost: PrevItem.standardHourlyCost,
          numberAvailable: PrevItem.numberAvailable,
          isScaleBoolean: PrevItem.isScale
        })
  

        this.firstRow = false;
        this.lastRow = false;
        this.UpdateDisable = false;
        this.DeleteDisable = false;
  
  
        const firstItem = this.ALLprodEquipments.findIndex(p=>p.equipId == this.ProdEquipmentsForm.value.equipId);
  
         if(firstItem === 0){
              this.DisabledPrevButton = true;
              this.firstRow = true;
         }
         
       
        this.DisabledNextButton = false;
  
      }
  }


  getNextRowData(){
    this.ALLprodEquipments = this.dataSource.filteredData;

      const index = this.ALLprodEquipments.findIndex(p=>p.equipId == this.ProdEquipmentsForm.value.equipId);
  
      const nextItem = this.ALLprodEquipments[index + 1];
  
      if(nextItem){
        this.ProdEquipmentsForm.setValue({
          equipId: nextItem.equipId,
          equipCode: nextItem.equipCode,
          equipName1: nextItem.equipName1,
          equipName2: nextItem.equipName2,
          jdesc: nextItem.jdesc,
          remarks: nextItem.remarks,
          maxWeight: nextItem.maxWeight,
          minWeight: nextItem.minWeight,
          timeRate: nextItem.timeRate,
          standardMonthlyCost: nextItem.standardMonthlyCost,
          standardHolyDays: nextItem.standardHolyDays,
          standardDailyCost: nextItem.standardDailyCost,
          standardDailyWorkHours: nextItem.standardDailyWorkHours,
          standardHourlyCost: nextItem.standardHourlyCost,
          numberAvailable: nextItem.numberAvailable,
          isScaleBoolean: nextItem.isScale
        })
  
        this.firstRow = false;
        this.UpdateDisable = false;
        this.DeleteDisable = false;

        const LastItem = this.ALLprodEquipments.findIndex(p=>p.equipId == this.ProdEquipmentsForm.value.equipId);
  
        if(this.ALLprodEquipments.length -1 === LastItem){
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
        this.definitionService.DeleteProdEquipment(this.ProdEquipmentsForm.value.equipId).subscribe(res=>{
          if(res){
            this.getAllProdEquipments();
            this.ProdEquipmentsForm.setValue({
              equipId: null,
              equipCode: null,
              equipName1: null,
              equipName2: null,
              jdesc: null,
              remarks: null,
              maxWeight: null,
              minWeight: null,
              timeRate: null,
              standardMonthlyCost: null,
              standardHolyDays: null,
              standardDailyCost: null,
              standardDailyWorkHours: null,
              standardHourlyCost: null,
              numberAvailable: null,
              isScaleBoolean: null
            })

            this.DeleteDisable = true;
            this.UpdateDisable = true;
            
          }
        })
           
      }
    });
  }

  undo(){
    this.ProdEquipmentsForm.disable();
    this.DisabledNextButton = false;
    this.DisabledPrevButton = false;
    this.lastRow = false;
    this.firstRow = false;
    this.reloadDisabled = false;
    this.SaveDisable = true;
    this.UndoDisabled = true;

    if(this.undoIndex != -1){
      const undoItem = this.ALLprodEquipments[this.undoIndex]

      if(undoItem){
       this.ProdEquipmentsForm.setValue({
        equipId: undoItem.equipId,
        equipCode: undoItem.equipCode,
        equipName1: undoItem.equipName1,
        equipName2: undoItem.equipName2,
        jdesc: undoItem.jdesc,
        remarks: undoItem.remarks,
        maxWeight: undoItem.maxWeight,
        minWeight: undoItem.minWeight,
        timeRate: undoItem.timeRate,
        standardMonthlyCost: undoItem.standardMonthlyCost,
        standardHolyDays: undoItem.standardHolyDays,
        standardDailyCost: undoItem.standardDailyCost,
        standardDailyWorkHours: undoItem.standardDailyWorkHours,
        standardHourlyCost: undoItem.standardHourlyCost,
        numberAvailable: undoItem.numberAvailable,
        isScaleBoolean: undoItem.isScaleBoolean
       })

      this.UpdateDisable = false;
      this.DeleteDisable = false;
     }
    }
  }

  New(){
    this.ProdEquipmentsForm.enable();
    this.ALLprodEquipments = this.dataSource.filteredData;
    this.undoIndex = this.ALLprodEquipments.findIndex(p=>p.equipId == this.ProdEquipmentsForm.value.equipId);
   this.ProdEquipmentsForm.setValue({
     equipId: null,
     equipCode: null,
     equipName1: null,
     equipName2: null,
     jdesc: null,
     remarks: null,
     maxWeight: null,
     minWeight: null,
     timeRate: null,
     standardMonthlyCost: null,
     standardHolyDays: null,
     standardDailyCost: null,
     standardDailyWorkHours: null,
     standardHourlyCost: null,
     numberAvailable: null,
     isScaleBoolean: null
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
  

 
}
