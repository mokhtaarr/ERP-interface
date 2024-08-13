import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from '../definition.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-vehicle-shapes',
  templateUrl: './vehicle-shapes.component.html',
  styleUrls: ['./vehicle-shapes.component.scss']
})
export class VehicleShapesComponent implements OnInit  {

  dataSource: any;
  displayedColumns: string[] = ['shapeCode', 'name1', 'name2', 'remark'];
  AllVehicleShapes :any[] = [];

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
  AllCustomerType: any;
  customerTypeForm: any;


  constructor(private definitionService: DefinitionService , private fb:FormBuilder,private dialog: MatDialog){
  }

  
  ngOnInit(): void {
    this.VehicleShapesForm.disable();
    this.GetAllVehicleShapes();
  }

  VehicleShapesForm = this.fb.group({
    vehicleShapeId:[],
    shapeCode:['',Validators.required],
    name1:['',Validators.required],
    name2:['',Validators.required],
    remark:['']
  })

GetAllVehicleShapes(){
  this.definitionService.GetAllVehicleShapes().subscribe(res=>{
    this.AllVehicleShapes = res;
    this.dataSource = new MatTableDataSource<any>(this.AllVehicleShapes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
}

onSumbit(){
  console.log(this.VehicleShapesForm.value)
  this.definitionService.AddVehicleShape(this.VehicleShapesForm.value).subscribe(res=>{
    if(res){
      this.GetAllVehicleShapes();
      this.VehicleShapesForm.disable();
      this.VehicleShapesForm.get('vehicleShapeId')?.setValue(res.id)
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
    this.VehicleShapesForm.setValue({
      vehicleShapeId: row.vehicleShapeId,
      shapeCode: row.shapeCode,
      name1: row.name1,
      name2: row.name2,
      remark: row.remark
    })

    this.DisabledNextButton = false;
    this.DisabledPrevButton = false;
    this.lastRow = false;
    this.firstRow = false;
    this.UpdateDisable = false;
    this.DeleteDisable = false;
    this.UndoDisabled = true;
    window.scrollTo({ top: 30, behavior: 'smooth' });
  }
}

updateVehicleShapes(){
  this.VehicleShapesForm.enable();
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
  this.AllVehicleShapes = this.dataSource.filteredData;
  this.undoIndex = this.AllVehicleShapes.findIndex(p=>p.vehicleShapeId == this.VehicleShapesForm.value.vehicleShapeId);
}

getFirstRowData(){
  this.AllVehicleShapes = this.dataSource.filteredData
  const FirstItem = this.AllVehicleShapes[0];
    if(FirstItem){
     this.VehicleShapesForm.setValue({
       vehicleShapeId: FirstItem.vehicleShapeId,
       shapeCode: FirstItem.shapeCode,
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
  this.AllVehicleShapes = this.dataSource.filteredData
  const LastItem = this.AllVehicleShapes[this.AllVehicleShapes.length-1];
  if(LastItem){
    this.VehicleShapesForm.setValue({
      vehicleShapeId: LastItem.vehicleShapeId,
      shapeCode: LastItem.shapeCode,
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
  this.AllVehicleShapes = this.dataSource.filteredData;

    const index = this.AllVehicleShapes.findIndex(p=>p.vehicleShapeId == this.VehicleShapesForm.value.vehicleShapeId);

    const PrevItem = this.AllVehicleShapes[index - 1];

    if(PrevItem){
     this.VehicleShapesForm.setValue({
       vehicleShapeId: PrevItem.vehicleShapeId,
       shapeCode: PrevItem.shapeCode,
       name1: PrevItem.name1,
       name2: PrevItem.name2,
       remark: PrevItem.remark
     })

      this.firstRow = false;
      this.lastRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;


      const firstItem = this.AllVehicleShapes.findIndex(p=>p.vehicleShapeId == this.VehicleShapesForm.value.vehicleShapeId);

       if(firstItem === 0){
            this.DisabledPrevButton = true;
            this.firstRow = true;
       }
       
     
      this.DisabledNextButton = false;

    }
}

getNextRowData(){
  this.AllVehicleShapes = this.dataSource.filteredData;

    const index = this.AllVehicleShapes.findIndex(p=>p.vehicleShapeId == this.VehicleShapesForm.value.vehicleShapeId);

    const nextItem = this.AllVehicleShapes[index + 1];

    if(nextItem){
     this.VehicleShapesForm.setValue({
       vehicleShapeId: nextItem.vehicleShapeId,
       shapeCode: nextItem.shapeCode,
       name1: nextItem.name1,
       name2: nextItem.name2,
       remark: nextItem.remark
     })
      
      this.firstRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;

      const LastItem = this.AllVehicleShapes.findIndex(p=>p.vehicleShapeId == this.VehicleShapesForm.value.vehicleShapeId);

      if(this.AllVehicleShapes.length -1 === LastItem){
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
      this.definitionService.DeleteVehicleShapes(this.VehicleShapesForm.value.vehicleShapeId).subscribe(res=>{
        if(res){
          this.GetAllVehicleShapes();
          this.VehicleShapesForm.setValue({
            vehicleShapeId: null,
            shapeCode: null,
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
  this.VehicleShapesForm.disable();

  this.DisabledNextButton = false;
  this.DisabledPrevButton = false;
  this.lastRow = false;
  this.firstRow = false;
  this.reloadDisabled = false;
  this.SaveDisable = true;
  this.UndoDisabled = true;

  if(this.undoIndex != -1){
    const undoItem = this.AllVehicleShapes[this.undoIndex]

    if(undoItem){
    this.VehicleShapesForm.setValue({
      vehicleShapeId: undoItem.vehicleShapeId,
      shapeCode: undoItem.shapeCode,
      name1: undoItem.name1,
      name2: undoItem.name2,
      remark: undoItem.remark
    })

    this.UpdateDisable = false;
    this.DeleteDisable = false;
   }
  }

  this.SaveDisable = true;

}



New(){
  this.VehicleShapesForm.enable();
  this.AllVehicleShapes = this.dataSource.filteredData;
  this.undoIndex = this.AllVehicleShapes.findIndex(p=>p.vehicleShapeId == this.VehicleShapesForm.value.vehicleShapeId);
  this.VehicleShapesForm.setValue({
    vehicleShapeId: null,
    shapeCode: null,
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


Filterchange(data: Event) {
  const value = (data.target as HTMLInputElement).value;
  this.dataSource.filter = value;
}

}
