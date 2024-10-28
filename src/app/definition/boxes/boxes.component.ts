import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DefinitionService } from '../definition.service';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.scss']
})
export class BoxesComponent implements OnInit {

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
  allAccounts:any[] = [];
  allBoxBanks:any[] = [];

  newDisable:boolean = false;


  dataSource: any;
  displayedColumns: string[] = [
    'boxCode',
    'desca',
    'desce',
  ];

  readonlyTable : boolean = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private definitionService: DefinitionService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public accountService : AccountService
  ) {}

  ngOnInit(): void {
    this.boxForm.disable();
    this.GetAllBoxBanks();
    this.GetAllAccountForBoxBanks();
  }

  boxForm = this.fb.group({
    boxId:[],
    boxCode:['',Validators.required],
    desca:['',Validators.required],
    desce:[''],
    accountId:[],
  })

  GetAllBoxBanks(){
    this.definitionService.GetAllBoxBanks().subscribe(res=>{
      this.allBoxBanks = res;
      this.dataSource = new MatTableDataSource<any>(this.allBoxBanks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  GetAllAccountForBoxBanks(){
    this.definitionService.GetAllAccountForBoxBanks().subscribe(res=>{
      this.allAccounts = res;
    })
  }

  New() {
    
    this.boxForm.enable();
    this.readonlyTable = true;
    this.newDisable = true;

    this.undoIndex = this.allBoxBanks.findIndex(p=>p.boxId == this.boxForm.value.boxId);
    this.boxForm.setValue({
      boxId: null,
      boxCode: null,
      desca: null,
      desce: null,
      accountId: null
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

    
Filterchange(data: Event) {
  const value = (data.target as HTMLInputElement).value;
  this.dataSource.filter = value;
}



fillForm(row:any){
  if(row){
   this.boxForm.setValue({
     boxId: row.boxId,
     boxCode: row.boxCode,
     desca: row.desca,
     desce: row.desce,
     accountId: row.accountId
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


 getLastRowData(){
  this.allBoxBanks = this.dataSource.filteredData
  const LastItem = this.allBoxBanks[this.allBoxBanks.length-1];
  if(LastItem){
    this.boxForm.setValue({
      boxId: LastItem.boxId,
      boxCode: LastItem.boxCode,
      desca: LastItem.desca,
      desce: LastItem.desce,
      accountId: LastItem.accountId
    })

  this.firstRow = false;
  this.lastRow = true;
  this.DisabledPrevButton = false;
  this.DisabledNextButton = true;
  this.UpdateDisable = false;
  this.DeleteDisable = false;

  }
}

onSumbit(){
  this.definitionService.AddBoxBank(this.boxForm.value).subscribe(res=>{
    if(res.status){
      this.GetAllBoxBanks();
      this.boxForm.disable();
      this.boxForm.get('boxId')?.setValue(res.id)
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


getNextRowData(){
    this.allBoxBanks = this.dataSource.filteredData;
    const index = this.allBoxBanks.findIndex(p=>p.boxId == this.boxForm.value.boxId);
    const nextItem = this.allBoxBanks[index + 1];

    if(nextItem){
     this.boxForm.setValue({
      boxId: nextItem.boxId,
      boxCode: nextItem.boxCode,
      desca: nextItem.desca,
      desce: nextItem.desce,
      accountId: nextItem.accountId
     })
      this.firstRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      const LastItem = this.allBoxBanks.findIndex(p=>p.boxId == this.boxForm.value.boxId);
      if(this.allBoxBanks.length -1 === LastItem){
        this.DisabledNextButton = true;
        this.lastRow = true;
      }
      this.DisabledPrevButton = false;
    }
}


getPrevRowData(){
    this.allBoxBanks = this.dataSource.filteredData;
    const index = this.allBoxBanks.findIndex(p=>p.boxId == this.boxForm.value.boxId);

    if (index === 0) {
      this.DisabledPrevButton = true;
      this.firstRow = true;
    }


    const PrevItem = this.allBoxBanks[index - 1];

    if(PrevItem){
      this.boxForm.setValue({
        boxId: PrevItem.boxId,
        boxCode: PrevItem.boxCode,
        desca: PrevItem.desca,
        desce: PrevItem.desce,
        accountId: PrevItem.accountId
       })

      this.firstRow = false;
      this.lastRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;

      const firstItem = this.allBoxBanks.findIndex(p=>p.boxId == this.boxForm.value.boxId);

       if(firstItem === 0){
            this.DisabledPrevButton = true;
            this.firstRow = true;
       }
     
      this.DisabledNextButton = false;
    }
}


getFirstRowData(){
  this.allBoxBanks = this.dataSource.filteredData
  const FirstItem = this.allBoxBanks[0];
    if(FirstItem){
     this.boxForm.setValue({
      boxId: FirstItem.boxId,
      boxCode: FirstItem.boxCode,
      desca: FirstItem.desca,
      desce: FirstItem.desce,
      accountId: FirstItem.accountId
     })

    this.firstRow = true;
    this.lastRow = false;
    this.DisabledPrevButton = true;
    this.DisabledNextButton = false;
    this.UpdateDisable = false;
    this.DeleteDisable = false;
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
      this.definitionService.DeleteBoxBank(this.boxForm.value.boxId).subscribe(res=>{
        if(res){
          this.GetAllBoxBanks();
           this.boxForm.setValue({
             boxId: null,
             boxCode: null,
             desca: null,
             desce: null,
             accountId: null
           })
            
           this.DeleteDisable = true;
           this.UpdateDisable = true;
        }
      })
         
    }
  });
}



undo(){
  this.boxForm.disable();
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
    const undoItem = this.allBoxBanks[this.undoIndex]

    if(undoItem){
    this.boxForm.setValue({
      boxId: undoItem.boxId,
      boxCode: undoItem.boxCode,
      desca: undoItem.desca,
      desce: undoItem.desce,
      accountId: undoItem.accountId
    })
   }
  }
}


updateBoxBank(){
  this.boxForm.enable();
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
  this.allBoxBanks = this.dataSource.filteredData;
  this.undoIndex = this.allBoxBanks.findIndex(p=>p.boxId == this.boxForm.value.boxId);
}


}
