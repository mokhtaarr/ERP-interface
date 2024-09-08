import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from '../definition.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-movement-book',
  templateUrl: './movement-book.component.html',
  styleUrls: ['./movement-book.component.scss']
})
export class MovementBookComponent implements OnInit{

  dataSource: any;
  displayedColumns: string[] = ['prefixCode', 'bookNameAr', 'bookNameEn', 'termType','startNum','endNum'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  readonlyTable : boolean = false;
  newDisable:boolean = false;

  AllSysBooks:any[] = [];
  AllTermType:any[]=[];
  AllUser:any[]=[];
  AllBranches:any[]=[];

  
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
  
  constructor(private definitionService: DefinitionService , private fb:FormBuilder,private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver){
      this.breakpointObserver.observe([
        Breakpoints.Handset
      ]).subscribe(result => {
        if (result.matches) {
          this.displayedColumns = ['prefixCode', 'bookNameAr']; 
        } else {
          this.displayedColumns = ['prefixCode', 'bookNameAr', 'bookNameEn', 'termType', 'startNum', 'endNum']; 
        }
      });
  }
   

  ngOnInit(): void {
    this.SysBooksForm.disable();
    this.GetAllSysBooks();
    this.GetAllTermType();
    this.GetAllBranches();
    this.GetAllUser();
  }

  SysBooksForm = this.fb.group({
    bookId:[],
    prefixCode:['',Validators.required],
    bookNameAr:['',Validators.required],
    bookNameEn:[''],
    termType:[],
    storeId:[],
    userId:[],
    startNum:[],
    endNum:[],
    autoSerial:[],
    isDefault:[],
    systemIssuedOnly:[],
  })

  GetAllSysBooks(){
    this.definitionService.GetAllSysBooks().subscribe(res=>{
      this.AllSysBooks = res;
      this.dataSource = new MatTableDataSource<any>(this.AllSysBooks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
    })
  }

  GetAllTermType(){
    this.definitionService.GetAllTermType().subscribe(res=>{
      this.AllTermType = res;
    })
  }

  GetAllUser(){
    this.definitionService.GetAllUsers().subscribe(res=>{
      this.AllUser = res;
    })  
  }

  GetAllBranches(){
    this.definitionService.getAllBranches().subscribe(res=>{
      this.AllBranches = res;
    })
  }

  fillForm(row:any){
    if(row){
      this.SysBooksForm.setValue({
        bookId: row.bookId,
        prefixCode: row.prefixCode,
        bookNameAr: row.bookNameAr,
        bookNameEn: row.bookNameEn,
        termType: row.termType,
        storeId: row.storeId,
        userId: row.userId,
        startNum: row.startNum,
        endNum: row.endNum,
        autoSerial: row.autoSerial,
        isDefault: row.isDefault,
        systemIssuedOnly: row.systemIssuedOnly
      });
      
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.UndoDisabled = true;
      window.scrollTo({ top: 30, behavior: 'smooth' });

    }
  }
  
  onSmbit(){
    this.definitionService.AddSysBooks(this.SysBooksForm.value).subscribe(res=>{
      if(res.status){
        this.GetAllSysBooks();
        this.SysBooksForm.disable();
        this.SysBooksForm.get('bookId')?.setValue(res.id)
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

  updateSysBook(){
    this.SysBooksForm.enable();
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
    this.AllSysBooks = this.dataSource.filteredData;
    this.undoIndex = this.AllSysBooks.findIndex(p=>p.bookId == this.SysBooksForm.value.bookId);
  }

  getFirstRowData(){
    this.AllSysBooks = this.dataSource.filteredData
    const FirstItem = this.AllSysBooks[0];
      if(FirstItem){
      this.SysBooksForm.setValue({
        bookId: FirstItem.bookId,
        prefixCode: FirstItem.prefixCode,
        bookNameAr: FirstItem.bookNameAr,
        bookNameEn: FirstItem.bookNameEn,
        termType: FirstItem.termType,
        storeId: FirstItem.storeId,
        userId: FirstItem.userId,
        startNum: FirstItem.startNum,
        endNum: FirstItem.endNum,
        autoSerial: FirstItem.autoSerial,
        isDefault: FirstItem.isDefault,
        systemIssuedOnly: FirstItem.systemIssuedOnly
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
    this.AllSysBooks = this.dataSource.filteredData
    const LastItem = this.AllSysBooks[this.AllSysBooks.length-1];
    if(LastItem){
      this.SysBooksForm.setValue({
        bookId: LastItem.bookId,
        prefixCode: LastItem.prefixCode,
        bookNameAr: LastItem.bookNameAr,
        bookNameEn: LastItem.bookNameEn,
        termType: LastItem.termType,
        storeId: LastItem.storeId,
        userId: LastItem.userId,
        startNum: LastItem.startNum,
        endNum: LastItem.endNum,
        autoSerial: LastItem.autoSerial,
        isDefault: LastItem.isDefault,
        systemIssuedOnly: LastItem.systemIssuedOnly
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
    this.AllSysBooks = this.dataSource.filteredData;

      const index = this.AllSysBooks.findIndex(p=>p.bookId == this.SysBooksForm.value.bookId);
  
      const PrevItem = this.AllSysBooks[index - 1];
  
      if(PrevItem){
     this.SysBooksForm.setValue({
        bookId: PrevItem.bookId,
        prefixCode: PrevItem.prefixCode,
        bookNameAr: PrevItem.bookNameAr,
        bookNameEn: PrevItem.bookNameEn,
        termType: PrevItem.termType,
        storeId: PrevItem.storeId,
        userId: PrevItem.userId,
        startNum: PrevItem.startNum,
        endNum: PrevItem.endNum,
        autoSerial: PrevItem.autoSerial,
        isDefault: PrevItem.isDefault,
        systemIssuedOnly: PrevItem.systemIssuedOnly
     })

        this.firstRow = false;
        this.lastRow = false;
        this.UpdateDisable = false;
        this.DeleteDisable = false;
  
  
        const firstItem = this.AllSysBooks.findIndex(p=>p.bookId == this.SysBooksForm.value.bookId);
  
         if(firstItem === 0){
              this.DisabledPrevButton = true;
              this.firstRow = true;
         }
         
       
        this.DisabledNextButton = false;
  
      }
  }

  getNextRowData(){
    this.AllSysBooks = this.dataSource.filteredData;

      const index = this.AllSysBooks.findIndex(p=>p.bookId == this.SysBooksForm.value.bookId);
  
      const nextItem = this.AllSysBooks[index + 1];
  
      if(nextItem){
       this.SysBooksForm.setValue({
        bookId: nextItem.bookId,
        prefixCode: nextItem.prefixCode,
        bookNameAr: nextItem.bookNameAr,
        bookNameEn: nextItem.bookNameEn,
        termType: nextItem.termType,
        storeId: nextItem.storeId,
        userId: nextItem.userId,
        startNum: nextItem.startNum,
        endNum: nextItem.endNum,
        autoSerial: nextItem.autoSerial,
        isDefault: nextItem.isDefault,
        systemIssuedOnly: nextItem.systemIssuedOnly
       })
        
        this.firstRow = false;
        this.UpdateDisable = false;
        this.DeleteDisable = false;

        const LastItem = this.AllSysBooks.findIndex(p=>p.bookId == this.SysBooksForm.value.bookId);
  
        if(this.AllSysBooks.length -1 === LastItem){
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
        this.definitionService.DeleteSysBook(this.SysBooksForm.value.bookId).subscribe(res=>{
          if(res){
            this.GetAllSysBooks();
            this.SysBooksForm.setValue({
              bookId: null,
              prefixCode: null,
              bookNameAr: null,
              bookNameEn: null,
              termType: null,
              storeId: null,
              userId: null,
              startNum: null,
              endNum: null,
              autoSerial: null,
              isDefault: null,
              systemIssuedOnly: null
            })

            this.DeleteDisable = true;
            this.UpdateDisable = true;
            
          }
        })
           
      }
    });
  }

  undo(){
    this.SysBooksForm.disable();
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
      const undoItem = this.AllSysBooks[this.undoIndex]

      if(undoItem){
       this.SysBooksForm.setValue({
        bookId: undoItem.bookId,
        prefixCode: undoItem.prefixCode,
        bookNameAr: undoItem.bookNameAr,
        bookNameEn: undoItem.bookNameEn,
        termType: undoItem.termType,
        storeId: undoItem.storeId,
        userId: undoItem.userId,
        startNum: undoItem.startNum,
        endNum: undoItem.endNum,
        autoSerial: undoItem.autoSerial,
        isDefault: undoItem.isDefault,
        systemIssuedOnly: undoItem.systemIssuedOnly
       })

      this.UpdateDisable = false;
      this.DeleteDisable = false;
     }
    }
  }

  New(){
    this.SysBooksForm.enable();
    this.readonlyTable = true;
    this.newDisable = true;
    this.AllSysBooks = this.dataSource.filteredData;
    this.undoIndex = this.AllSysBooks.findIndex(p=>p.bookId == this.SysBooksForm.value.bookId);
   this.SysBooksForm.setValue({
     bookId: null,
     prefixCode: null,
     bookNameAr: null,
     bookNameEn: null,
     termType: null,
     storeId: null,
     userId: null,
     startNum: null,
     endNum: null,
     autoSerial: null,
     isDefault: null,
     systemIssuedOnly: null
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
