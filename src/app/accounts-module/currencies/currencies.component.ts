import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DefinitionService } from 'src/app/definition/definition.service';
import { AccountsModuleServicesService } from '../accounts-module-services.service';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmComponent } from 'src/app/definition/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent  implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['currencyCode', 'currencyDescA','currencyDescE', 'Rate'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  AllCurreny : any[] = [];

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
  undoIndex !: number
  AllItemCategory: any;
  itemCategoryForm: any;

  constructor(private AccountsService : AccountsModuleServicesService, private fb:FormBuilder,private dialog: MatDialog){

  }


  ngOnInit(): void {
    this.currencyForm.disable();
    this.getAllCurrencies();
  }

 currencyForm=this.fb.group({
  currencyId:[],
  currencyCode:['',Validators.required],
  currencyDescA:['',Validators.required],
  currencyDescE:[''],
  rate:[],
  remarks:['']
 })


 getAllCurrencies(){
  this.AccountsService.GetAllCurrencies().subscribe(res=>{
    this.AllCurreny = res;
    this.dataSource = new MatTableDataSource<any>(this.AllCurreny);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
 }

 onSumbit(){
  this.AccountsService.addCurrency(this.currencyForm.value).subscribe(res=>{
    if(res){
      this.getAllCurrencies();
      this.currencyForm.disable();
      this.DisabledNextButton = false;
      this.DisabledPrevButton = false;
      this.lastRow = false;
      this.firstRow = false;
      this.SaveDisable = true;
      this.UpdateDisable = false;
      this.UndoDisabled = true;
    }
  })
 }

 getLastRowData(){
  this.AllCurreny = this.dataSource.filteredData
  const LastItem = this.AllCurreny[this.AllCurreny.length-1];

 if(LastItem){
  this.currencyForm.setValue({
    currencyId: LastItem.currencyId,
    currencyCode: LastItem.currencyCode,
    currencyDescA: LastItem.currencyDescA,
    currencyDescE: LastItem.currencyDescE,
    rate: LastItem.rate,
    remarks: LastItem.remarks
  });   
 }

  this.DeleteDisable = false;
  this.firstRow = false;
  this.lastRow = true;
  this.DisabledPrevButton = false;
  this.DisabledNextButton = true;
  this.UpdateDisable = false;

 }

 getNextRowData(){
  this.AllCurreny = this.dataSource.filteredData;

  const index = this.AllCurreny.findIndex(p=>p.currencyId == this.currencyForm.value.currencyId);

  const nextItem = this.AllCurreny[index + 1];

  if(nextItem){
    this.currencyForm.setValue({
      currencyId: nextItem.currencyId,
        currencyCode: nextItem.currencyCode,
        currencyDescA: nextItem.currencyDescA,
        currencyDescE: nextItem.currencyDescE,
        rate: nextItem.rate,
        remarks: nextItem.remarks
    })
    
    this.firstRow = false;
    this.UpdateDisable = false;
    this.DeleteDisable = false;

    const LastItem = this.AllCurreny.findIndex(p=>p.currencyId == this.currencyForm.value.currencyId);

    if(this.AllCurreny.length -1 === LastItem){
      this.DisabledNextButton = true;
      this.lastRow = true;
    }
    this.DisabledPrevButton = false;
  }
 }

 getPrevRowData(){
  this.AllCurreny = this.dataSource.filteredData;

  const index = this.AllCurreny.findIndex(p=>p.currencyId == this.currencyForm.value.currencyId);

  const PrevItem = this.AllCurreny[index - 1];

  if(PrevItem){
    this.currencyForm.setValue({
      currencyId: PrevItem.currencyId,
        currencyCode: PrevItem.currencyCode,
        currencyDescA: PrevItem.currencyDescA,
        currencyDescE: PrevItem.currencyDescE,
        rate: PrevItem.rate,
        remarks: PrevItem.remarks
    });
    this.firstRow = false;
    this.lastRow = false;
    this.UpdateDisable = false;
    this.DeleteDisable = false;

    const firstItem = this.AllCurreny.findIndex(p=>p.currencyId == this.currencyForm.value.currencyId);

     if(firstItem === 0){
          this.DisabledPrevButton = true;
          this.firstRow = true;
     }
     
    this.DisabledNextButton = false;
  }
 }

 getFirstRowData(){
  this.AllCurreny = this.dataSource.filteredData
  const FirstItem = this.AllCurreny[0];
  if(FirstItem){
    this.currencyForm.setValue({
      currencyId: FirstItem.currencyId,
      currencyCode: FirstItem.currencyCode,
      currencyDescA: FirstItem.currencyDescA,
      currencyDescE: FirstItem.currencyDescE,
      rate: FirstItem.rate,
      remarks: FirstItem.remarks
    });
  }
  this.firstRow = true;
  this.lastRow = false;
  this.DisabledPrevButton = true;
  this.DisabledNextButton = false;
  this.UpdateDisable = false;
  this.DeleteDisable = false;


 }

 Open_delete_confirm(){
  var _popup = this.dialog.open(DeleteConfirmComponent, {
    width: '30%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  });

  _popup.afterClosed().subscribe((response) => {
    if (response) {
      this.AccountsService.DeleteCurrency(this.currencyForm.value.currencyId).subscribe(res=>{
        if(res){
          this.getAllCurrencies();
          this.currencyForm.setValue({
            currencyId: null,
            currencyCode: null,
            currencyDescA: null,
            currencyDescE: null,
            rate: null,
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
  this.currencyForm.disable();
  if(this.undoIndex != -1){
    const undoItem = this.AllCurreny[this.undoIndex]
    if(undoItem){
      this.currencyForm.setValue({
        currencyId: undoItem.currencyId,
        currencyCode: undoItem.currencyCode,
        currencyDescA: undoItem.currencyDescA,
        currencyDescE: undoItem.currencyDescE,
        rate: undoItem.rate,
        remarks: undoItem.remarks
      });
     
    }
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
   
    this.SaveDisable = true;


 }

 updateCurrency(){
  this.currencyForm.enable()
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
  this.AllCurreny = this.dataSource.filteredData;
  this.undoIndex = this.AllCurreny.findIndex(p=>p.currencyId == this.currencyForm.value.currencyId);
 }

 New(){
  this.currencyForm.enable();

  this.AllCurreny = this.dataSource.filteredData;
  this.undoIndex = this.AllCurreny.findIndex(p=>p.currencyId == this.currencyForm.value.currencyId);

  this.currencyForm.setValue({
    currencyId: null,
    currencyCode: null,
    currencyDescA: null,
    currencyDescE: null,
    rate: null,
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

 fillForm(row:any){
  if(row){
    this.currencyForm.setValue({
      currencyId: row.currencyId,
      currencyCode: row.currencyCode,
      currencyDescA: row.currencyDescA,
      currencyDescE: row.currencyDescE,
      rate: row.rate,
      remarks: row.remarks
    });
    this.UpdateDisable = false;
    this.DeleteDisable = false;
    this.UndoDisabled = true;
    window.scrollTo({ top: 30, behavior: 'smooth' });

  }
 }


}
