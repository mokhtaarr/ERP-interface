import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmComponent } from 'src/app/definition/delete-confirm/delete-confirm.component';
import { BanksService } from '../banks.service';

@Component({
  selector: 'app-ms-letter-of-guarantee-status',
  templateUrl: './ms-letter-of-guarantee-status.component.html',
  styleUrls: ['./ms-letter-of-guarantee-status.component.scss']
})
export class MsLetterOfGuaranteeStatusComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['code', 'name1', 'name2','remarks'];

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
  undoIndex !: number;

  AllLetters:any[] = []

  readonlyTable : boolean = false;
  newDisable:boolean = false;

  constructor(private BankService: BanksService , private fb:FormBuilder,private dialog: MatDialog){
  }

  ngOnInit(): void {
   this.bankForm.disable();
   this.GetAllLetter();
  }


  bankForm = this.fb.group({
    letOfGrnteeStatusId:[],
    code:['',Validators.required],
    name1:['',Validators.required],
    name2:[''],
    remarks:['']
  })
   
  GetAllLetter(){
    this.BankService.GetAllLetterStatus().subscribe(res=>{
     this.AllLetters = res;
     this.dataSource = new MatTableDataSource<any>(this.AllLetters);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
    })
  }

  onSmbit(){
    this.BankService.AddLetterStatus(this.bankForm.value).subscribe(res=>{
      if(res.status){
        this.GetAllLetter();
        this.bankForm.disable();
        this.bankForm.get('letOfGrnteeStatusId')?.setValue(res.id)
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
  
  getLastRowData(){
    this.AllLetters = this.dataSource.filteredData
      const LastItem = this.AllLetters[this.AllLetters.length-1];
      if(LastItem){
      this.bankForm.setValue({
        letOfGrnteeStatusId: LastItem.letOfGrnteeStatusId,
        code: LastItem.code,
        name1: LastItem.name1,
        name2: LastItem.name2,
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

  getFirstRowData() {
    this.AllLetters = this.dataSource.filteredData
    const FirstItem = this.AllLetters[0];
      if(FirstItem){
     this.bankForm.setValue({
      letOfGrnteeStatusId: FirstItem.letOfGrnteeStatusId,
      code: FirstItem.code,
      name1: FirstItem.name1,
      name2: FirstItem.name2,
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

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  getPrevRowData() {
  this.AllLetters = this.dataSource.filteredData;

  const index = this.AllLetters.findIndex(p=>p.letOfGrnteeStatusId == this.bankForm.value.letOfGrnteeStatusId);
  if(index === 0 || index === -1){
    this.DisabledPrevButton = true;
    this.firstRow = true; 
  }

  const PrevItem = this.AllLetters[index - 1];

  if(PrevItem){
    this.bankForm.setValue({
      letOfGrnteeStatusId: PrevItem.letOfGrnteeStatusId,
      code: PrevItem.code,
      name1: PrevItem.name1,
      name2: PrevItem.name2,
      remarks: PrevItem.remarks
    })
    this.firstRow = false;
    this.lastRow = false;
    this.UpdateDisable = false;
    this.DeleteDisable = false;


    const firstItem = this.AllLetters.findIndex(p=>p.letOfGrnteeStatusId == this.bankForm.value.letOfGrnteeStatusId);

     if(firstItem === 0){
          this.DisabledPrevButton = true;
          this.firstRow = true;
     }
     
   
    this.DisabledNextButton = false;

  }
  }


  getNextRowData() {
    this.AllLetters = this.dataSource.filteredData;

    const index = this.AllLetters.findIndex(p=>p.letOfGrnteeStatusId == this.bankForm.value.letOfGrnteeStatusId);

    const nextItem = this.AllLetters[index + 1];

    if(nextItem){
      this.bankForm.setValue({
        letOfGrnteeStatusId: nextItem.letOfGrnteeStatusId,
        code: nextItem.code,
        name1: nextItem.name1,
        name2: nextItem.name2,
        remarks: nextItem.remarks
      })
    
      this.firstRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;

      const LastItem = this.AllLetters.findIndex(p=>p.letOfGrnteeStatusId == this.bankForm.value.letOfGrnteeStatusId);

      if(this.AllLetters.length -1 === LastItem){
        this.DisabledNextButton = true;
        this.lastRow = true;

      }

      this.DisabledPrevButton = false;

    }
  }

  New() {
    this.bankForm.enable();
    this.readonlyTable = true;
    this.newDisable = true;
    this.AllLetters = this.dataSource.filteredData;
    this.undoIndex = this.AllLetters.findIndex(p=>p.letOfGrnteeStatusId == this.bankForm.value.letOfGrnteeStatusId);
    this.bankForm.setValue({
      letOfGrnteeStatusId: null,
      code: null,
      name1: null,
      name2: null,
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

  updateLetter() {
    this.bankForm.enable();
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
    this.AllLetters = this.dataSource.filteredData;
    this.undoIndex = this.AllLetters.findIndex(p=>p.letOfGrnteeStatusId == this.bankForm.value.letOfGrnteeStatusId);
  }

  
  undo() {
    this.bankForm.disable();
    this.readonlyTable = false;
    this.newDisable = false;
    this.DisabledNextButton = false;
    this.DisabledPrevButton = false;
    this.lastRow = false;
    this.firstRow = false;
    this.reloadDisabled = false;
    this.DeleteDisable = true;
    this.UpdateDisable = true;
    this.SaveDisable = true;
    this.UndoDisabled = true;

    if(this.undoIndex != -1){
      const undoItem = this.AllLetters[this.undoIndex]

      if(undoItem.letOfGrnteeStatusId != null){
        this.DeleteDisable = false;
        this.UpdateDisable = false;  
       this.bankForm.setValue({
        letOfGrnteeStatusId: undoItem.letOfGrnteeStatusId,
        code: undoItem.code,
        name1: undoItem.name1,
        name2: undoItem.name2,
        remarks: undoItem.remarks
       })
      }
    }
  }


  Open_delete_confirm() {
    var _popup = this.dialog.open(DeleteConfirmComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });

    _popup.afterClosed().subscribe((response) => {
      if (response) {
        this.BankService.DeleteLetterStatus(this.bankForm.value.letOfGrnteeStatusId).subscribe(res=>{
          if(res){
            this.GetAllLetter();
            this.bankForm.setValue({
              letOfGrnteeStatusId: null,
              code: null,
              name1: null,
              name2: null,
              remarks: null
            })
            this.DeleteDisable = true;
            this.UpdateDisable = true;
          }
        })
      }
    });
  }



  fillForm(row:any){
    if(row){
      this.bankForm.setValue({
        letOfGrnteeStatusId: row.letOfGrnteeStatusId,
        code: row.code,
        name1: row.name1,
        name2: row.name2,
        remarks: row.remarks
      });
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.UndoDisabled = true;
      window.scrollTo({ top: 30, behavior: 'smooth' });
    }
  }

}


