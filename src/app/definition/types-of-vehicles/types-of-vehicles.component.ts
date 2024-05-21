import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from '../definition.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-types-of-vehicles',
  templateUrl: './types-of-vehicles.component.html',
  styleUrls: ['./types-of-vehicles.component.scss']
})
export class TypesOfVehiclesComponent implements OnInit{

  dataSource: any;
  displayedColumns: string[] = ['typeCode', 'name1', 'name2', 'remark'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  AllVehicleTypes:any[] = []

  DisabledPrevButton: boolean = false;
  DisabledNextButton: boolean = false;
  firstRow: boolean = false;
  lastRow: boolean = false;
  DeleteDisable :boolean = true;
  SaveDisable : boolean = true;
  UpdateDisable : boolean = true;

  EditReadonly : boolean = false;
  reloadDisabled : boolean = true;
  UndoDisabled : boolean = true;
  undoIndex!: number;

  constructor(private definitionService: DefinitionService , private fb:FormBuilder,private dialog: MatDialog){
  }
   

  ngOnInit(): void {
    this.vehicleTypeForm.disable();
    this.GetAllVehicleType();
  }

  vehicleTypeForm = this.fb.group({
    vehicleTypId:[],
    typeCode:['',Validators.required],
    name1:['',Validators.required],
    name2:['',Validators.required],
    remark:[''],

  })

  GetAllVehicleType(){
    return this.definitionService.GetAllVehicleTypes().subscribe(res=>{
      this.AllVehicleTypes = res;
      this.dataSource = new MatTableDataSource<any>(this.AllVehicleTypes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  fillForm(row:any){
    if(row){
      this.vehicleTypeForm.setValue({
        vehicleTypId: row.vehicleTypId,
        typeCode: row.typeCode,
        name1: row.name1,
        name2: row.name2,
        remark: row.remark
      });
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.UndoDisabled = true;
      window.scrollTo({ top: 30, behavior: 'smooth' });
    }
  }

  onSumbit(){
    this.definitionService.AddVehicleType(this.vehicleTypeForm.value).subscribe(res=>{
      if(res){
        this.GetAllVehicleType();
        this.vehicleTypeForm.disable();
        this.vehicleTypeForm.get('vehicleTypId')?.setValue(res.id);
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

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  getFirstRowData(){
    this.AllVehicleTypes = this.dataSource.filteredData
    const FirstItem = this.AllVehicleTypes[0];
      if(FirstItem){
      this.vehicleTypeForm.setValue({
        vehicleTypId: FirstItem.vehicleTypId,
        typeCode: FirstItem.typeCode,
        name1: FirstItem.name1,
        name2: FirstItem.name2,
        remark: FirstItem.remark
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
    this.AllVehicleTypes = this.dataSource.filteredData
    const LastItem = this.AllVehicleTypes[this.AllVehicleTypes.length-1];
    if(LastItem){
      this.vehicleTypeForm.setValue({
        vehicleTypId: LastItem.vehicleTypId,
        typeCode: LastItem.typeCode,
        name1: LastItem.name1,
        name2: LastItem.name2,
        remark: LastItem.remark
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
    this.AllVehicleTypes = this.dataSource.filteredData;

      const index = this.AllVehicleTypes.findIndex(p=>p.vehicleTypId == this.vehicleTypeForm.value.vehicleTypId);
  
      const PrevItem = this.AllVehicleTypes[index - 1];
  
      if(PrevItem){
     this.vehicleTypeForm.setValue({
       vehicleTypId: PrevItem.vehicleTypId,
       typeCode: PrevItem.typeCode,
       name1: PrevItem.name1,
       name2: PrevItem.name2,
       remark: PrevItem.remark
     })

        this.firstRow = false;
        this.lastRow = false;
        this.UpdateDisable = false;
        this.DeleteDisable = false;
  
  
        const firstItem = this.AllVehicleTypes.findIndex(p=>p.vehicleTypId == this.vehicleTypeForm.value.vehicleTypId);
  
         if(firstItem === 0){
              this.DisabledPrevButton = true;
              this.firstRow = true;
         }
         
       
        this.DisabledNextButton = false;
  
      }
  }

  getNextRowData(){
    this.AllVehicleTypes = this.dataSource.filteredData;

      const index = this.AllVehicleTypes.findIndex(p=>p.vehicleTypId == this.vehicleTypeForm.value.vehicleTypId);
  
      const nextItem = this.AllVehicleTypes[index + 1];
  
      if(nextItem){
       this.vehicleTypeForm.setValue({
         vehicleTypId: nextItem.vehicleTypId,
         typeCode: nextItem.typeCode,
         name1: nextItem.name1,
         name2: nextItem.name2,
         remark: nextItem.remark
       })
        
        this.firstRow = false;
        this.UpdateDisable = false;
        this.DeleteDisable = false;

        const LastItem = this.AllVehicleTypes.findIndex(p=>p.vehicleTypId == this.vehicleTypeForm.value.vehicleTypId);
  
        if(this.AllVehicleTypes.length -1 === LastItem){
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
        this.definitionService.DeleteVehicleType(this.vehicleTypeForm.value.vehicleTypId).subscribe(res=>{
          if(res){
            this.GetAllVehicleType();
            this.vehicleTypeForm.setValue({
              vehicleTypId: null,
              typeCode: null,
              name1: null,
              name2: null,
              remark: null
            })

            this.DeleteDisable = true;
            this.UpdateDisable = true;
            
          }
        })
           
      }
    });
  }


  undo(){
    this.vehicleTypeForm.disable();

    if(this.undoIndex != -1){
      const undoItem = this.AllVehicleTypes[this.undoIndex]

      if(undoItem){
       this.vehicleTypeForm.setValue({
         vehicleTypId: undoItem.vehicleTypId,
         typeCode: undoItem.typeCode,
         name1: undoItem.name1,
         name2: undoItem.name2,
         remark: undoItem.remark
       })

      this.UpdateDisable = false;
      this.DisabledNextButton = false;
      this.DisabledPrevButton = false;
      this.lastRow = false;
      this.firstRow = false;
      this.reloadDisabled = false;
      this.SaveDisable = true;
      this.UndoDisabled = true;
      this.DeleteDisable = false;
   
     }
    }
  }

  updateVehicleType(){
    this.vehicleTypeForm.enable();
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
    this.AllVehicleTypes = this.dataSource.filteredData;
    this.undoIndex = this.AllVehicleTypes.findIndex(p=>p.vehicleTypId == this.vehicleTypeForm.value.vehicleTypId);
  }

  New(){
    this.vehicleTypeForm.enable();
    this.AllVehicleTypes = this.dataSource.filteredData;
    this.undoIndex = this.AllVehicleTypes.findIndex(p=>p.vehicleTypId == this.vehicleTypeForm.value.vehicleTypId);
   this.vehicleTypeForm.setValue({
     vehicleTypId: null,
     typeCode: null,
     name1: null,
     name2: null,
     remark: null
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
