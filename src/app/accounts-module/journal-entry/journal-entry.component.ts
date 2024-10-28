import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { DeleteConfirmComponent } from 'src/app/definition/delete-confirm/delete-confirm.component';
import { PurchasesServicesService } from 'src/app/purchases/purchases-services.service';
import { UpdateItemComponent } from 'src/app/purchases/update-item/update-item.component';
import { UpdateMsReturnPurchaseItemsComponent } from 'src/app/purchases/update-ms-return-purchase-items/update-ms-return-purchase-items.component';
import { AddItemsToSalesInvoiceComponent } from 'src/app/sales/add-items-to-sales-invoice/add-items-to-sales-invoice.component';
import { SalesService } from 'src/app/sales/sales.service';
import { AccountsModuleServicesService } from '../accounts-module-services.service';
import { AllSearchAccountsComponent } from '../all-search-accounts/all-search-accounts.component';
import { UpdateAccountComponent } from '../update-account/update-account.component';
import { UpdateAccountFromDataBaseComponent } from '../update-account-from-data-base/update-account-from-data-base.component';

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.scss']
})
export class JournalEntryComponent implements OnInit  {
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

  AllSysBooks:any[] = [];
  AllVendor:any[] = [];
  FilteredAllVendors:any[]=[];
  AllCurrency: any[] = [];
  AllAnalyticalCode:any[] = [];

  itemCollections : any[] = [];
  itemCollectionFromDataBase : any[] = [];
  AddItemDisable : boolean = false;

  AllJurnalEntry:any[] = [];
  
  readonlyTable: boolean = true;
  newDisable: boolean = false;

  AllRectSourceType : any[] = [];
  FilteredAllRectSourceType : any[] = [];
  trnoReadonly : boolean = false;
  AllTerms : any[] = [];
  AllSalesEmployess : any[] = [];

  addItemDisable : boolean = true;
  jurnalDetailAccountsData : any;
  AddItemsDisable : boolean = true;
  trnoReadonly2 : boolean = true;
  FilteredAllSalesEmployess : any[] = [];
  AllSysBooksForSalesInvoice: any;
  

  constructor(private purchasesServicesService: PurchasesServicesService , private fb:FormBuilder,private dialog: MatDialog,
    public toastr: ToastrService, public accountService : AccountService,private salesService : SalesService,
    private accountModuleService : AccountsModuleServicesService ){
  }

  CalJurnalEntryForm = this.fb.group({
    jurnalId:[0],
    trNo:[],
    bookId:[,Validators.required],
    trDate: [new Date()],
    termId:[],
    manualTrNo:[''],
    aid:[],
    storeId:[''],
    CreatedBy:[''],
    jurnalDesc:[''],
    isOpenning:[],
    jurnalDetailAccounts :[[]]

  })

  ngOnInit(): void {
    this.CalJurnalEntryForm.disable();
    this.getAllSysBooks();
    this.GetAllSysAnalyticalCodes();
    this.GetAllCalJurnalEntry();
  }

  GetAllCalJurnalEntry(){
    this.accountModuleService.GetAllCalJurnalEntry().subscribe(res=>{
      this.AllJurnalEntry = res;
    })
  }

  getAllSysBooks(){
    this.accountModuleService.getAllBooksForJurnalEntry().subscribe(res=>{
      if(res.length > 0){
        this.AllSysBooks = res
        this.purchasesServicesService.getAllMsTerms(this.AllSysBooks[0].bookId).subscribe(res=>{
          if(res.length > 0){
           this.AllTerms = res
          }
         })
      }
    })
  }

  getUserInfo(){
    this.accountService.currentUser$.subscribe(res =>{
      this.CalJurnalEntryForm.get('CreatedBy')?.setValue(res!.userId)
      this.CalJurnalEntryForm.get('storeId')?.setValue(res!.storeId)
      })
  }
  

  onSumbit() {
    console.log("this.CalJurnalEntryForm.value 1",this.CalJurnalEntryForm.value)

    this.jurnalDetailAccountsData = this.itemCollections;

    if(this.jurnalDetailAccountsData != null){
      this.CalJurnalEntryForm.get("jurnalDetailAccounts")?.setValue(this.jurnalDetailAccountsData)
    }

    console.log("this.CalJurnalEntryForm.value 2",this.CalJurnalEntryForm.value)

   this.accountModuleService.AddCalJurnalEntry(this.CalJurnalEntryForm.value).subscribe(res=>{
    if(res.status){
      this.GetAllCalJurnalEntry();
      this.CalJurnalEntryForm.disable();
      this.CalJurnalEntryForm.get('jurnalId')?.setValue(res.id);
      this.DisabledNextButton = false;
      this.DisabledPrevButton = false;
      this.lastRow = false;
      this.firstRow = false;
      this.SaveDisable=true;
      this.UpdateDisable = false;
      this.UndoDisabled = true;
      this.DeleteDisable=false;
      this.readonlyTable = true;
      this.AddItemDisable = true;
      this.AddItemsDisable = true
    }
   })
  }

  getLastRowData(){
    const LastItem = this.AllJurnalEntry[this.AllJurnalEntry.length - 1];
    if (LastItem) {
      this.CalJurnalEntryForm.setValue({
        jurnalId: LastItem.jurnalId,
        trNo: LastItem.trNo ?? null,
        bookId: LastItem.bookId,
        trDate: LastItem.trDate,
        termId: LastItem.termId,
        manualTrNo: LastItem.manualTrNo,
        aid: LastItem.aid,
        storeId: null,
        CreatedBy: null,
        jurnalDesc: LastItem.jurnalDesc,
        isOpenning: LastItem.isOpenning,
        jurnalDetailAccounts: null
      });

      this.itemCollectionFromDataBase = []
      this.itemCollections = [];

      this.accountModuleService.getCalJurnalDetails(this.CalJurnalEntryForm.value.jurnalId).subscribe(res=>{
        this.itemCollectionFromDataBase = res
      })

      this.firstRow = false;
      this.lastRow = true;
      this.DisabledPrevButton = false;
      this.DisabledNextButton = true;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.trnoReadonly = false;
    }
  }

  getNextRowData(){
    const index = this.AllJurnalEntry.findIndex(
      (p) => p.jurnalId == this.CalJurnalEntryForm.value.jurnalId
    );

    const nextItem = this.AllJurnalEntry[index + 1];

    if (nextItem.jurnalId != null) {
      this.CalJurnalEntryForm.setValue({
        jurnalId: nextItem.jurnalId,
        trNo: nextItem.trNo ?? null,
        bookId: nextItem.bookId,
        trDate: nextItem.trDate,
        termId: nextItem.termId,
        manualTrNo: nextItem.manualTrNo,
        aid: nextItem.aid,
        storeId: null,
        CreatedBy: null,
        jurnalDesc: nextItem.jurnalDesc,
        isOpenning: nextItem.isOpenning,
        jurnalDetailAccounts: null
      });

      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
     
      this.accountModuleService.getCalJurnalDetails(this.CalJurnalEntryForm.value.jurnalId).subscribe(res=>{
        this.itemCollectionFromDataBase = res
      })

      this.firstRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.trnoReadonly = false;

      const LastItem = this.AllJurnalEntry.findIndex(
        (p) => p.jurnalId == this.CalJurnalEntryForm.value.jurnalId
      );

      if (this.AllJurnalEntry.length - 1 === LastItem) {
        this.DisabledNextButton = true;
        this.lastRow = true;
      }

      this.DisabledPrevButton = false;
    }

  }

  Open_delete_confirm(){

  }

  getPrevRowData(){
    const index = this.AllJurnalEntry.findIndex(
      (p) => p.jurnalId == this.CalJurnalEntryForm.value.jurnalId
    );

    if (index === 0 || index === -1) {
      this.DisabledPrevButton = true;
      this.firstRow = true;
    }

    const PrevItem = this.AllJurnalEntry[index - 1];

    if (PrevItem.jurnalId != null) {
      this.CalJurnalEntryForm.setValue({
        jurnalId: PrevItem.jurnalId,
        trNo: PrevItem.trNo ?? null,
        bookId: PrevItem.bookId,
        trDate: PrevItem.trDate,
        termId: PrevItem.termId,
        manualTrNo: PrevItem.manualTrNo,
        aid: PrevItem.aid,
        storeId: null,
        CreatedBy: null,
        jurnalDesc: PrevItem.jurnalDesc,
        isOpenning: PrevItem.isOpenning,
        jurnalDetailAccounts: null
      });

      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      
      this.accountModuleService.getCalJurnalDetails(this.CalJurnalEntryForm.value.jurnalId).subscribe(res=>{
        this.itemCollectionFromDataBase = res
      })


      this.firstRow = false;
      this.lastRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.trnoReadonly = false;


      const firstItem = this.AllJurnalEntry.findIndex(
        (p) => p.jurnalId == this.CalJurnalEntryForm.value.jurnalId
      );

      if (firstItem === 0) {
        this.DisabledPrevButton = true;
        this.firstRow = true;
      }

      this.DisabledNextButton = false;
    }
  }

  getFirstRowData(){
    this.trnoReadonly = false;
    const FirstItem = this.AllJurnalEntry[0];
    if (FirstItem.jurnalId != null) {
      this.CalJurnalEntryForm.setValue({
        jurnalId: FirstItem.jurnalId,
        trNo: FirstItem.trNo ?? null,
        bookId: FirstItem.bookId,
        trDate: FirstItem.trDate,
        termId: FirstItem.termId,
        manualTrNo: FirstItem.manualTrNo,
        aid: FirstItem.aid,
        storeId: null,
        CreatedBy: null,
        jurnalDesc: FirstItem.jurnalDesc,
        isOpenning: FirstItem.isOpenning,
        jurnalDetailAccounts: null
      });      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      
       this.accountModuleService.getCalJurnalDetails(this.CalJurnalEntryForm.value.jurnalId).subscribe(res=>{
         this.itemCollectionFromDataBase = res
       })


      this.firstRow = true;
      this.lastRow = false;
      this.DisabledPrevButton = true;
      this.DisabledNextButton = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
    }
  }


  undo(){
    this.trnoReadonly = false;
    this.CalJurnalEntryForm.disable();
    this.readonlyTable = true;
    this.newDisable = false;
    this.AddItemsDisable = true;

    this.DisabledNextButton = false;
    this.DisabledPrevButton = false;
    this.lastRow = false;
    this.firstRow = false;
    this.reloadDisabled = false;
    this.DeleteDisable = true;
    this.UpdateDisable = true;
    this.SaveDisable = true;
    this.UndoDisabled = true;

    if (this.undoIndex != -1) {
      const undoItem = this.AllJurnalEntry[this.undoIndex];

      if (undoItem.jurnalId != null) {
        this.DeleteDisable = false;
        this.UpdateDisable = false;
        this.CalJurnalEntryForm.setValue({
          jurnalId: undoItem.jurnalId,
          trNo: undoItem.trNo ?? null,
          bookId: undoItem.bookId,
          trDate: undoItem.trDate,
          termId: undoItem.termId,
          manualTrNo: undoItem.manualTrNo,
          aid: undoItem.aid,
          storeId: null,
          CreatedBy: null,
          jurnalDesc: undoItem.jurnalDesc,
          isOpenning: undoItem.isOpenning,
          jurnalDetailAccounts: null
        });

        this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      

       this.accountModuleService.getCalJurnalDetails(this.CalJurnalEntryForm.value.jurnalId).subscribe(res=>{
         this.itemCollectionFromDataBase = res
       })


      }
    }
  }

  updatePurchaseInvoice(){
    this.trnoReadonly = true;
    this.CalJurnalEntryForm.enable();
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
    this.undoIndex = this.AllJurnalEntry.findIndex(p=>p.jurnalId == this.CalJurnalEntryForm.value.jurnalId);
    this.readonlyTable = false;
    this.AddItemsDisable = false;
    this.getUserInfo();

  }

  New(){
    this.CalJurnalEntryForm.enable();
    this.readonlyTable = false;
    this.newDisable = true;
    this.itemCollections = [];
    this.itemCollectionFromDataBase = [];
    this.AddItemsDisable = false;

    this.undoIndex = this.AllJurnalEntry.findIndex(
      (p) => p.jurnalId == this.CalJurnalEntryForm.value.jurnalId
    );

    this.CalJurnalEntryForm.setValue({
      jurnalId: 0,
      trNo: null,
      bookId: null,
      trDate: null,
      termId: null,
      manualTrNo: null,
      aid: null,
      storeId: null,
      CreatedBy: null,
      jurnalDesc: null,
      isOpenning: null,
      jurnalDetailAccounts: null
    });

    this.salesService.getCurrentTime().subscribe(res=>{
      this.CalJurnalEntryForm.get('trDate')?.setValue(res.currentDateTime);
    })

    this.trnoReadonly = true;

    this.CalJurnalEntryForm.get('termId')?.setValue(this.AllTerms[0]?.termId);
    this.CalJurnalEntryForm.get('bookId')?.setValue(this.AllSysBooks[0]?.bookId);

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

    this.getUserInfo();
    console.log("this.CalJurnalEntryForm.value",this.CalJurnalEntryForm.value)
  }


  GetAllCurrency() {
    this.purchasesServicesService.GetAllCurrency().subscribe((res) => {
      this.AllCurrency = res;
    });
  }

  GetAllSysAnalyticalCodes(){
    this.purchasesServicesService.GetAllSysAnalyticalCodes().subscribe(res=>{
      this.AllAnalyticalCode = res;
    })
  }
 
  onBookChange(event: MatSelectChange): void {
    this.purchasesServicesService.getAllMsTerms(event.value).subscribe(res=>{
     if(res.length > 0){
      this.AllTerms = res
      this.CalJurnalEntryForm.get('termId')?.setValue(this.AllTerms[0].termId)
     }
    })
  }

 


  AddAccount(){
    var _popup = this.dialog.open(AllSearchAccountsComponent, {
      width: '80%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        Title: 'أضافه حساب',
      },
    });
    _popup.afterClosed().subscribe((response) => {
        if (response) {
          for (let i = 0; i < response.length; i++) {
            let item = response[i];
            let exists = this.itemCollections.some(existingItem => existingItem.accountId === item.accountId);
            let existsInDataBase;
  
            if(this.itemCollectionFromDataBase.length != 0){
              existsInDataBase = this.itemCollectionFromDataBase.some(i=>i.accountId === item.accountId)
            }
            
            if (!exists && !existsInDataBase) {
              
              this.itemCollections.push(item);
  
            }else{
              this.toastr.info(`هذا الحساب ${item.accountNameA} موجود من قبل`)
            }
          }
      }
    });
  }
 

  updateItemCollection(itemCollection:any){
    var _popup = this.dialog.open(UpdateAccountComponent, {
      width: '90%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        Title: 'تعديل الحساب',
        itemCollectionData : itemCollection,
      },
    });
    _popup.afterClosed().subscribe((response) => {
      if(response){
          this.itemCollections = this.itemCollections.filter(item => item.accountId !== itemCollection.accountId);
          this.itemCollections.push(response);
          this.toastr.success("تم التعديل بنجاح")
  
      }
    });
  }

  DeleteItemCollection(accountId:any){
    var _popup = this.dialog.open(DeleteConfirmComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
    _popup.afterClosed().subscribe((response) => {
      if (response) {
        this.itemCollections = this.itemCollections.filter(item => item.accountId !== accountId);
        this.toastr.success("تم المسح بنجاح")
      }
    });
  }

  updateItemCollectionFromDataBase(invoiceItem : any){
    var _popup = this.dialog.open(UpdateAccountFromDataBaseComponent,{
      width: '90%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        Title: 'تعديل',
        itemCollectionData : invoiceItem,
      },
    });
    _popup.afterClosed().subscribe((response) => {
      if(response){
        this.accountModuleService.getCalJurnalDetails(this.CalJurnalEntryForm.value.jurnalId).subscribe(res=>{
          this.itemCollectionFromDataBase = res
        })
  
      }
    });
  }
  
  DeleteItemCollectionFromDataBase(jurnalDetailId : any){
    var _popup = this.dialog.open(DeleteConfirmComponent, {
    width: '30%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  });
  _popup.afterClosed().subscribe((response) => {
    if (response) {
     this.accountModuleService.DeleteJournalDetail(jurnalDetailId).subscribe(res=>{
      if(res.status)
      {
        this.accountModuleService.getCalJurnalDetails(this.CalJurnalEntryForm.value.jurnalId).subscribe(res=>{
          this.itemCollectionFromDataBase = res
         })      
      }
     })
    }
  });
  }
}


