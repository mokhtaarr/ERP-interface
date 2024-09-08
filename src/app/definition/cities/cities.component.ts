import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from '../definition.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit{

  dataSource: any;
  displayedColumns: string[] = ['cityCode', 'cityName', 'remarks'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  AllCity : any[] = [];

  readonlyTable : boolean = false;
  newDisable:boolean = false;

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
  AllVehicleShapes: any;
  VehicleShapesForm: any;

  constructor(private definitionService: DefinitionService , private fb:FormBuilder,private dialog: MatDialog){
  }
  
  ngOnInit(): void {
    this.CityForm.disable();
    this.GetAllCities();
  }

  CityForm = this.fb.group({
    cityId:[],
    cityCode:['',Validators.required],
    cityName:['',Validators.required],
    remarks:['']
  })

  GetAllCities(){
    this.definitionService.GetAllCities().subscribe(res=>{
      this.AllCity = res;
      this.dataSource = new MatTableDataSource<any>(this.AllCity);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  onSumbit(){
    this.definitionService.AddCity(this.CityForm.value).subscribe(res=>{
      if(res.status){
        this.GetAllCities();
        this.CityForm.disable();
        this.CityForm.get('cityId')?.setValue(res.id)
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
    this.CityForm.setValue({
      cityId: row.cityId,
      cityCode: row.cityCode,
      cityName: row.cityName,
      remarks: row.remarks
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
  
  updateCity(){
    this.CityForm.enable();
    this.readonlyTable = true;
    this.newDisable = true;
    this.DeleteDisable = true;
    this.DisabledNextButton = true;
    this.DisabledPrevButton = true;
    this.lastRow = true;
    this.firstRow = true;
    this.SaveDisable = false;
    this.EditReadonly = true;
    this.reloadDisabled = true;
    this.UpdateDisable = true;
    this.UndoDisabled = false;
    this.AllCity = this.dataSource.filteredData;
    this.undoIndex = this.AllCity.findIndex(p=>p.cityId == this.CityForm.value.cityId);
  }
  
  getFirstRowData(){
    this.AllCity = this.dataSource.filteredData
    const FirstItem = this.AllCity[0];
      if(FirstItem){
       this.CityForm.setValue({
         cityId: FirstItem.cityId,
         cityCode: FirstItem.cityCode,
         cityName: FirstItem.cityName,
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
    this.AllCity = this.dataSource.filteredData
    const LastItem = this.AllCity[this.AllCity.length-1];
    if(LastItem){
      this.CityForm.setValue({
        cityId: LastItem.cityId,
        cityCode: LastItem.cityCode,
        cityName: LastItem.cityName,
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
    this.AllCity = this.dataSource.filteredData;
  
      const index = this.AllCity.findIndex(p=>p.cityId == this.CityForm.value.cityId);
  
  
      if (index === 0) {
        this.DisabledPrevButton = true;
        this.firstRow = true;
      }


      const PrevItem = this.AllCity[index - 1];
  
      if(PrevItem){
       this.CityForm.setValue({
         cityId: PrevItem.cityId,
         cityCode: PrevItem.cityCode,
         cityName: PrevItem.cityName,
         remarks: PrevItem.remarks
       })
  
        this.firstRow = false;
        this.lastRow = false;
        this.UpdateDisable = false;
        this.DeleteDisable = false;
  
  
        const firstItem = this.AllCity.findIndex(p=>p.cityId == this.CityForm.value.cityId);
  
         if(firstItem === 0){
              this.DisabledPrevButton = true;
              this.firstRow = true;
         }
         
       
        this.DisabledNextButton = false;
  
      }
  }
  

  getNextRowData(){
    this.AllCity = this.dataSource.filteredData;
  
      const index = this.AllCity.findIndex(p=>p.cityId == this.CityForm.value.cityId);
  
      const nextItem = this.AllCity[index + 1];
  
      if(nextItem){
       this.CityForm.setValue({
         cityId: nextItem.cityId,
         cityCode: nextItem.cityCode,
         cityName: nextItem.cityName,
         remarks: nextItem.remarks
       })
        
        this.firstRow = false;
        this.UpdateDisable = false;
        this.DeleteDisable = false;
  
        const LastItem = this.AllCity.findIndex(p=>p.cityId == this.CityForm.value.cityId);
  
        if(this.AllCity.length -1 === LastItem){
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
        this.definitionService.DeleteCity(this.CityForm.value.cityId).subscribe(res=>{
          if(res){
            this.GetAllCities();
            this.CityForm.setValue({
              cityId: null,
              cityCode: null,
              cityName: null,
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
    this.CityForm.disable();
    this.readonlyTable = false;
    this.newDisable = false;
    this.UpdateDisable = false;
    this.DisabledNextButton = false;
    this.DisabledPrevButton = false;
    this.lastRow = false;
    this.firstRow = false;
    this.reloadDisabled = false;
    this.SaveDisable = true;
    this.UndoDisabled = true;
    this.DeleteDisable = false;
  
    if(this.undoIndex != -1){
      const undoItem = this.AllCity[this.undoIndex]
  
      if(undoItem){
      this.CityForm.setValue({
        cityId: undoItem.cityId,
        cityCode: undoItem.cityCode,
        cityName: undoItem.cityName,
        remarks: undoItem.remarks
      })
     }

    }
  }
  
  
New(){
  this.CityForm.enable();
  this.readonlyTable = true;
  this.newDisable = true;

  this.AllCity = this.dataSource.filteredData;
  this.undoIndex = this.AllCity.findIndex(p=>p.cityId == this.CityForm.value.cityId);
  this.CityForm.setValue({
    cityId: null,
    cityCode: null,
    cityName: null,
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
