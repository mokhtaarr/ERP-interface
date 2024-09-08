import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BanksService } from 'src/app/banks/banks.service';
import { SystemToolsService } from '../system-tools.service';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmComponent } from 'src/app/definition/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-g-users',
  templateUrl: './g-users.component.html',
  styleUrls: ['./g-users.component.scss']
})
export class GUsersComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['userCode', 'firstName', 'lastName','userName','userType'];

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

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
  undoIndex !: number;

  AllUsers:any[] = []
  AllEmployees:any[] = []
  AllStores:any=[];

  constructor(private SystemToolsServices : SystemToolsService , private fb:FormBuilder,private dialog: MatDialog){
  }

  ngOnInit(): void {
  this.UserForm.disable();
   this.GetAllUsers();
   this.GetAllMsStores();
   this.GetAllEmployees();
  }

  UserForm = this.fb.group({
    userId:[],
    userCode:['',Validators.required],
    firstName:['',Validators.required],
    lastName:[''],
    userName:['',Validators.required],
    password:[,Validators.required],
    empId:[],
    storeId:[],
    isActive:[],
    userType:[]
  })

  GetAllUsers(){
    this.SystemToolsServices.GetAllUsers().subscribe(res=>{
     this.AllUsers = res;
     this.dataSource = new MatTableDataSource<any>(this.AllUsers);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
    })
  }

  onSumbit(){
    this.SystemToolsServices.AddUser(this.UserForm.value).subscribe(res=>{
      if(res.status){
        this.GetAllUsers();
        this.UserForm.disable();
        this.UserForm.get('userId')?.setValue(res.id)
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

  GetAllEmployees(){
    this.SystemToolsServices.GetAllEmployees().subscribe(res=>{
      this.AllEmployees = res
    })
  }

  getLastRowData(){
    this.AllUsers = this.dataSource.filteredData
      const LastItem = this.AllUsers[this.AllUsers.length-1];
      if(LastItem){
      this.UserForm.setValue({
        userId: LastItem.userId,
        userCode: LastItem.userCode,
        firstName: LastItem.firstName,
        lastName: LastItem.lastName,
        userName: LastItem.userName,
        password: LastItem.password,
        empId: LastItem.empId,
        storeId: LastItem.storeId,
        isActive: LastItem.isActive,
        userType: LastItem.userType
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
    this.AllUsers = this.dataSource.filteredData
    const FirstItem = this.AllUsers[0];
      if(FirstItem){
     this.UserForm.setValue({
        userId: FirstItem.userId,
        userCode: FirstItem.userCode,
        firstName: FirstItem.firstName,
        lastName: FirstItem.lastName,
        userName: FirstItem.userName,
        password: FirstItem.password,
        empId: FirstItem.empId,
        storeId: FirstItem.storeId,
        isActive: FirstItem.isActive,
        userType: FirstItem.userType
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
    this.AllUsers = this.dataSource.filteredData;

  const index = this.AllUsers.findIndex(p=>p.userId == this.UserForm.value.userId);

  
  if(index === 0 || index === -1){
    this.DisabledPrevButton = true;
    this.firstRow = true;
  }

  const PrevItem = this.AllUsers[index - 1];

  if(PrevItem){
    this.UserForm.setValue({
        userId: PrevItem.userId,
        userCode: PrevItem.userCode,
        firstName: PrevItem.firstName,
        lastName: PrevItem.lastName,
        userName: PrevItem.userName,
        password: PrevItem.password,
        empId: PrevItem.empId,
        storeId: PrevItem.storeId,
        isActive: PrevItem.isActive,
        userType: PrevItem.userType
    })
    this.firstRow = false;
    this.lastRow = false;
    this.UpdateDisable = false;
    this.DeleteDisable = false;

    const firstItem = this.AllUsers.findIndex(p=>p.userId == this.UserForm.value.userId);

     if(firstItem === 0){
          this.DisabledPrevButton = true;
          this.firstRow = true;
     }
    this.DisabledNextButton = false;
  }
  }


  getNextRowData() {
    this.AllUsers = this.dataSource.filteredData;

    const index = this.AllUsers.findIndex(p=>p.userId == this.UserForm.value.userId);

    const nextItem = this.AllUsers[index + 1];

    if(nextItem){
      this.UserForm.setValue({
        userId: nextItem.userId,
        userCode: nextItem.userCode,
        firstName: nextItem.firstName,
        lastName: nextItem.lastName,
        userName: nextItem.userName,
        password: nextItem.password,
        empId: nextItem.empId,
        storeId: nextItem.storeId,
        isActive: nextItem.isActive,
        userType: nextItem.userType
      })
    
      this.firstRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;

      const LastItem = this.AllUsers.findIndex(p=>p.userId == this.UserForm.value.userId);

      if(this.AllUsers.length -1 === LastItem){
        this.DisabledNextButton = true;
        this.lastRow = true;

      }

      this.DisabledPrevButton = false;

    }
  }

  New() {
    this.UserForm.enable();
    this.readonlyTable = true;
    this.newDisable = true;
    this.AllUsers = this.dataSource.filteredData;
    this.undoIndex = this.AllUsers.findIndex(p=>p.userId == this.UserForm.value.userId);
    this.UserForm.setValue({
      userId: null,
      userCode: null,
      firstName: null,
      lastName: null,
      userName: null,
      password: null,
      empId: null,
      storeId: null,
      isActive: null,
      userType: null
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


  updateUser() {
    this.UserForm.enable();
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
    this.AllUsers = this.dataSource.filteredData;
    this.undoIndex = this.AllUsers.findIndex(p=>p.userId == this.UserForm.value.userId);
  }


  undo() {
    this.UserForm.disable();
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
      const undoItem = this.AllUsers[this.undoIndex]

      if(undoItem.userId != null){
        this.DeleteDisable = false;
        this.UpdateDisable = false;  
       this.UserForm.setValue({
        userId: undoItem.userId,
        userCode: undoItem.userCode,
        firstName: undoItem.firstName,
        lastName: undoItem.lastName,
        userName: undoItem.userName,
        password: undoItem.password,
        empId: undoItem.empId,
        storeId: undoItem.storeId,
        isActive: undoItem.isActive,
        userType: undoItem.userType
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
        this.SystemToolsServices.DeleteUser(this.UserForm.value.userId).subscribe(res=>{
          if(res){
            this.GetAllUsers();
            this.UserForm.setValue({
              userId: null,
              userCode: null,
              firstName: null,
              lastName: null,
              userName: null,
              password: null,
              empId: null,
              storeId: null,
              isActive: null,
              userType: null
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
      this.UserForm.setValue({
        userId: row.userId,
        userCode: row.userCode,
        firstName: row.firstName,
        lastName: row.lastName,
        userName: row.userName,
        password: row.password,
        empId: row.empId,
        storeId: row.storeId,
        isActive: row.isActive,
        userType: row.userType
      });
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.UndoDisabled = true;
      window.scrollTo({ top: 30, behavior: 'smooth' });
    }
  }

  GetAllMsStores(){
    this.SystemToolsServices.GetAllMsStores().subscribe(res=>{
      this.AllStores=res;
    })
   }
  


}
