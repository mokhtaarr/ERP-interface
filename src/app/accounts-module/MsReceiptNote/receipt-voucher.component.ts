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
import { concat } from 'rxjs';

@Component({
  selector: 'app-receipt-voucher',
  templateUrl: './receipt-voucher.component.html',
  styleUrls: ['./receipt-voucher.component.scss']
})
export class ReceiptVoucherComponent implements OnInit  {
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

  AllReceiptNote:any[] = [];
  
  readonlyTable: boolean = true;
  newDisable: boolean = false;

  AllRectSourceType : any[] = [];
  FilteredAllRectSourceType : any[] = [];
  trnoReadonly : boolean = false;
  AllTerms : any[] = [];
  AllSalesEmployess : any[] = [];

  addItemDisable : boolean = true;
  invoiceItemsData : any;
  AddItemsDisable : boolean = true;
  trnoReadonly2 : boolean = true;
  FilteredAllSalesEmployess : any[] = [];
  AllSysBooksForSalesInvoice: any;
  AllBankBox : any[] = [];
  paidPriceValue : any = 0;
  RateValue : any = 0;

  constructor(private purchasesServicesService: PurchasesServicesService , private fb:FormBuilder,private dialog: MatDialog,
    public toastr: ToastrService, public accountService : AccountService,private salesService : SalesService,
  private accountModuleService : AccountsModuleServicesService ){
  }

  ReceiptNoteForm = this.fb.group({
    rectId:[0],
    trNo:[0],
    bookId:[,Validators.required],
    trDate: [new Date()],
    termId:[],
    rectSourceType : [0],
    customerId:[,Validators.required],
    currencyId:[],
    manualTrNo:[''],
    aid:[],
    storeId:[''],
    CreatedBy:[''],
    invoiceItem :[[]],
    rate : [],
    bookIdForSalesInvoice:[],
    boxId:[],
    tranType:[],
    chequeOpenId:[],
    balanceDebitLocal:[],
    valueBeforeRate:[0],
    paidPrice:[0],
    valueBeforeRateValue:[0],
    paidPriceValue:[0],
  })


  ngOnInit(): void {
    this.ReceiptNoteForm.disable();
    this.getAllSysBooks();
    this.GetAllCurrency();
    this.GetAllSysAnalyticalCodes();
    this.getAllReceiptNote();
    this.getSalesEmployess();
    this.getAllSysBooksForSalesInvoice();
    this.getAllBankBox();

  }

  getAllReceiptNote(){
    this.accountModuleService.getAllReceiptNote().subscribe(res=>{
      this.AllReceiptNote = res;
    })
  }

  getAllSysBooks(){
    this.accountModuleService.getAllBooksForMsReceiptNote().subscribe(res=>{
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

  getAllBankBox(){
    this.accountModuleService.GetAllBoxBank().subscribe(res=>{
      this.AllBankBox = res;
      this.ReceiptNoteForm.get('boxId')?.setValue(this.AllBankBox[0].boxId);
    })
  }

  getUserInfo(){
    this.accountService.currentUser$.subscribe(res =>{
      this.ReceiptNoteForm.get('CreatedBy')?.setValue(res!.userId)
      this.ReceiptNoteForm.get('storeId')?.setValue(res!.storeId)
      })
  }
  

  onSumbit() {
    // this.invoiceItemsData = this.itemCollections;

    // if(this.invoiceItemsData != null){
    //   this.ReceiptNoteForm.get("invoiceItem")?.setValue(this.invoiceItemsData)
    // }
   this.accountModuleService.AddMsReceiptNote(this.ReceiptNoteForm.value).subscribe(res=>{
    if(res.status){
      this.getAllReceiptNote();
      this.ReceiptNoteForm.disable();
      this.ReceiptNoteForm.get('rectId')?.setValue(res.id);
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
    const LastItem = this.AllReceiptNote[this.AllReceiptNote.length - 1];
    
    if (LastItem) {
      this.ReceiptNoteForm.setValue({
        rectId: LastItem.rectId,
        trNo: LastItem.trNo ?? null,
        bookId: LastItem.bookId,
        trDate: LastItem.trDate,
        termId: LastItem.termId,
        rectSourceType: LastItem.rectSourceType,
        customerId: LastItem.customerId,
        currencyId: LastItem.currencyId,
        manualTrNo: LastItem.manualTrNo,
        aid: LastItem.aid,
        rate: LastItem.rate,
        storeId: null,
        CreatedBy: null,
        invoiceItem: null,
        bookIdForSalesInvoice: null,
        boxId: LastItem.boxId,
        tranType: LastItem.tranType,
        chequeOpenId: LastItem.chequeOpenId,
        balanceDebitLocal: null,
        valueBeforeRate: LastItem.valueBeforeRate,
        paidPrice: LastItem.paidPrice,
        valueBeforeRateValue: null,
        paidPriceValue: null
      });

      this.onRectSourceTypeChange({ value: LastItem.rectSourceType } as MatSelectChange);

      const selectedBoxBank = this.AllBankBox.find((acc) => acc.boxId === LastItem.boxId);
      if(selectedBoxBank != null || selectedBoxBank > 0){
        this.accountModuleService.GetAccountBalance(selectedBoxBank.accountId).subscribe(res=>{
          this.ReceiptNoteForm.get('balanceDebitLocal')?.setValue(res.balanceDebitLocal)
        })
      }

      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      
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
    const index = this.AllReceiptNote.findIndex(
      (p) => p.rectId == this.ReceiptNoteForm.value.rectId
    );

    const nextItem = this.AllReceiptNote[index + 1];

    if (nextItem.rectId != null) {
      this.ReceiptNoteForm.setValue({
        rectId: nextItem.rectId,
        trNo: nextItem.trNo ?? null,
        bookId: nextItem.bookId ?? null,
        trDate: nextItem.trDate,
        termId: nextItem.termId,
        rectSourceType: nextItem.rectSourceType,
        customerId: nextItem.customerId,
        currencyId: nextItem.currencyId,
        manualTrNo: nextItem.manualTrNo,
        aid: nextItem.aid,
        rate: nextItem.rate,
        storeId: null,
        CreatedBy: null,
        invoiceItem: null,
        bookIdForSalesInvoice: null,
        boxId: nextItem.bookId ?? null,
        tranType: nextItem.tranType,
        chequeOpenId: nextItem.chequeOpenId,
        balanceDebitLocal: null,
        valueBeforeRate: nextItem.valueBeforeRate,
        paidPrice: nextItem.paidPrice,
        valueBeforeRateValue: null,
        paidPriceValue: null
      });

      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      

      this.onRectSourceTypeChange({ value: nextItem.rectSourceType } as MatSelectChange);

      const selectedBoxBank = this.AllBankBox.find((acc) => acc.boxId === nextItem.boxId);

      if(selectedBoxBank != null || selectedBoxBank > 0){
        this.accountModuleService.GetAccountBalance(selectedBoxBank.accountId).subscribe(res=>{
          this.ReceiptNoteForm.get('balanceDebitLocal')?.setValue(res.balanceDebitLocal)
        })
      }
     

      this.firstRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.trnoReadonly = false;

      const LastItem = this.AllReceiptNote.findIndex(
        (p) => p.rectId == this.ReceiptNoteForm.value.rectId
      );

      if (this.AllReceiptNote.length - 1 === LastItem) {
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
        this.getUserInfo();
        this.accountModuleService.
        DeleteReceiptNote(this.ReceiptNoteForm.value.rectId,this.ReceiptNoteForm.value.CreatedBy)
        .subscribe(res=>{
          if(res){
            this.getAllReceiptNote();
            this.ReceiptNoteForm.setValue({
              rectId: null,
              trNo: null,
              bookId: null,
              trDate: null,
              termId: null,
              rectSourceType: null,
              customerId: null,
              currencyId: null,
              manualTrNo: null,
              aid: null,
              storeId: null,
              CreatedBy: null,
              invoiceItem: null,
              rate: null,
              bookIdForSalesInvoice: null,
              boxId: null,
              tranType: null,
              chequeOpenId: null,
              balanceDebitLocal: null,
              valueBeforeRate: null,
              paidPrice: null,
              valueBeforeRateValue: null,
              paidPriceValue: null
            })
  
            this.DeleteDisable = true;
            this.UpdateDisable = true;
          }
        })
      }
    });
  }

  getPrevRowData(){
    const index = this.AllReceiptNote.findIndex(
      (p) => p.rectId == this.ReceiptNoteForm.value.rectId
    );

    if (index === 0 || index === -1) {
      this.DisabledPrevButton = true;
      this.firstRow = true;
    }

    const PrevItem = this.AllReceiptNote[index - 1];

    if (PrevItem.rectId != null) {
      this.ReceiptNoteForm.setValue({
        rectId: PrevItem.rectId,
        trNo: PrevItem.trNo ?? null,
        bookId: PrevItem.bookId,
        trDate: PrevItem.trDate,
        termId: PrevItem.termId,
        rectSourceType: PrevItem.rectSourceType,
        customerId: PrevItem.customerId,
        currencyId: PrevItem.currencyId,
        manualTrNo: PrevItem.manualTrNo,
        aid: PrevItem.aid,
        rate: PrevItem.rate,
        storeId: null,
        CreatedBy: null,
        invoiceItem: null,
        bookIdForSalesInvoice: null,
        boxId: PrevItem.boxId ?? null,
        tranType: PrevItem.tranType,
        chequeOpenId: PrevItem.chequeOpenId,
        balanceDebitLocal: null,
        valueBeforeRate: PrevItem.valueBeforeRate,
        paidPrice: PrevItem.paidPrice,
        valueBeforeRateValue: null,
        paidPriceValue: null
      });

      this.onRectSourceTypeChange({ value: PrevItem.rectSourceType } as MatSelectChange);

      const selectedBoxBank = this.AllBankBox.find((acc) => acc.boxId === PrevItem.boxId);

      if(selectedBoxBank != null || selectedBoxBank > 0){
        this.accountModuleService.GetAccountBalance(selectedBoxBank.accountId).subscribe(res=>{
          this.ReceiptNoteForm.get('balanceDebitLocal')?.setValue(res.balanceDebitLocal)
        })
      }
      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      
    
      this.firstRow = false;
      this.lastRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.trnoReadonly = false;


      const firstItem = this.AllReceiptNote.findIndex(
        (p) => p.rectId == this.ReceiptNoteForm.value.rectId
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

    const FirstItem = this.AllReceiptNote[0];
    if (FirstItem.rectId != null) {
      this.ReceiptNoteForm.setValue({
        rectId: FirstItem.rectId,
        trNo: FirstItem.trNo ?? null,
        bookId: FirstItem.bookId,
        trDate: FirstItem.trDate,
        termId: FirstItem.termId,
        rectSourceType: FirstItem.rectSourceType,
        customerId: FirstItem.customerId,
        currencyId: FirstItem.currencyId,
        manualTrNo: FirstItem.manualTrNo,
        aid: FirstItem.aid,
        rate: FirstItem.rate,
        storeId: null,
        CreatedBy: null,
        invoiceItem: null,
        bookIdForSalesInvoice: null,
        boxId: FirstItem.boxId ?? null,
        tranType: FirstItem.tranType,
        chequeOpenId: FirstItem.chequeOpenId,
        balanceDebitLocal: null,
        valueBeforeRate: FirstItem.valueBeforeRate,
        paidPrice: FirstItem.paidPrice,
        valueBeforeRateValue: null,
        paidPriceValue: null
      });

      this.onRectSourceTypeChange({ value: FirstItem.rectSourceType } as MatSelectChange);

      const selectedBoxBank = this.AllBankBox.find((acc) => acc.boxId === FirstItem.boxId);

      if(selectedBoxBank != null || selectedBoxBank > 0){
        this.accountModuleService.GetAccountBalance(selectedBoxBank.accountId).subscribe(res=>{
          this.ReceiptNoteForm.get('balanceDebitLocal')?.setValue(res.balanceDebitLocal)
        })
      }

      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];

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
    this.ReceiptNoteForm.disable();
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
      const undoItem = this.AllReceiptNote[this.undoIndex];

      if (undoItem.rectId != null) {
        this.DeleteDisable = false;
        this.UpdateDisable = false;
        this.ReceiptNoteForm.setValue({
          rectId: undoItem.rectId,
          trNo: undoItem.trNo ?? null,
          bookId: undoItem.bookId,
          trDate: undoItem.trDate,
          termId: undoItem.termId,
          rectSourceType: undoItem.rectSourceType,
          customerId: undoItem.customerId,
          currencyId: undoItem.currencyId,
          manualTrNo: undoItem.manualTrNo,
          aid: undoItem.aid,
          rate: undoItem.rate,
          storeId: null,
          CreatedBy: null,
          invoiceItem: null,
          bookIdForSalesInvoice: null,
          boxId: undoItem.boxId,
          tranType: undoItem.tranType,
          chequeOpenId: undoItem.chequeOpenId,
          balanceDebitLocal: null,
          valueBeforeRate: undoItem.valueBeforeRate,
          paidPrice: undoItem.paidPrice,
          valueBeforeRateValue: null,
          paidPriceValue: null
        });

        this.onRectSourceTypeChange({ value: undoItem.rectSourceType } as MatSelectChange);

        const selectedBoxBank = this.AllBankBox.find((acc) => acc.boxId === undoItem.boxId);

        if(selectedBoxBank != null || selectedBoxBank > 0){
          this.accountModuleService.GetAccountBalance(selectedBoxBank.accountId).subscribe(res=>{
            this.ReceiptNoteForm.get('balanceDebitLocal')?.setValue(res.balanceDebitLocal)
          })
        }
        
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      }
    }
  }

  updatePurchaseInvoice(){
    this.getUserInfo();
    this.trnoReadonly = true;
    this.ReceiptNoteForm.enable();
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
    this.undoIndex = this.AllReceiptNote.findIndex(p=>p.rectId == this.ReceiptNoteForm.value.rectId);
    this.readonlyTable = false;
    this.AddItemsDisable = false;

  }

  New(){
    this.ReceiptNoteForm.enable();
    this.readonlyTable = false;
    this.newDisable = true;
    this.itemCollections = [];
    this.itemCollectionFromDataBase = [];
    this.AddItemsDisable = false;

    this.undoIndex = this.AllReceiptNote.findIndex(
      (p) => p.rectId == this.ReceiptNoteForm.value.rectId
    );

    this.ReceiptNoteForm.setValue({
      rectId: 0,
      trNo: 0,
      bookId: null,
      trDate: null,
      termId: null,
      rectSourceType: 2,
      customerId: null,
      currencyId: null,
      manualTrNo: null,
      aid: null,
      rate: null,
      storeId: null,
      CreatedBy: null,
      invoiceItem: null,
      bookIdForSalesInvoice: null,
      boxId: null,
      tranType: null,
      chequeOpenId: null,
      balanceDebitLocal: null,
      valueBeforeRate: null,
      paidPrice: null,
      valueBeforeRateValue: null,
      paidPriceValue: null
    });

    this.getAllBankBox();


    this.salesService.getCurrentTime().subscribe(res=>{
      this.ReceiptNoteForm.get('trDate')?.setValue(res.currentDateTime);
    })

    this.getUserInfo();
    this.onRectSourceTypeChange({ value: 2 } as MatSelectChange);

    this.ReceiptNoteForm.get('bookIdForSalesInvoice')?.setValue(this.AllSysBooksForSalesInvoice[0].bookId);

    this.trnoReadonly = true;

    this.ReceiptNoteForm.get('termId')?.setValue(this.AllTerms[0]?.termId);
    this.ReceiptNoteForm.get('bookId')?.setValue(this.AllSysBooks[0]?.bookId);

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

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value;
    this.searchVendor(searchValue);
  }

  searchVendor(searchValue: string): void {
    if (!searchValue) {
      this.FilteredAllRectSourceType = this.AllRectSourceType;
      return;
    }

    this.FilteredAllRectSourceType = this.AllRectSourceType.filter((acc) =>
      acc.code.toString().includes(searchValue)
    );

    if (this.FilteredAllRectSourceType.length === 0) {
      this.FilteredAllRectSourceType = this.AllRectSourceType.filter((acc) =>
        acc.name.toString().includes(searchValue)
      );
    }

    if (this.FilteredAllRectSourceType.length > 0) {
      this.ReceiptNoteForm.get('customerId')?.setValue(
        this.FilteredAllRectSourceType[0].id
      );

      this.ReceiptNoteForm.get('currencyId')?.setValue(this.FilteredAllRectSourceType[0].currencyId);
      const targetRate = this.AllCurrency.find(currency => currency.currencyId === this.FilteredAllRectSourceType[0].currencyId);
      this.ReceiptNoteForm.get('rate')?.setValue(targetRate.rate);

    }
  }

  GetAllCurrency() {
    this.purchasesServicesService.GetAllCurrency().subscribe((res) => {
      this.AllCurrency = res;
    });
  }


  onAccountSelect(event: MatSelectChange): void {
    const selectedVendor = this.FilteredAllVendors.find(
      (acc) => acc.customerId === event.value);
    this.ReceiptNoteForm.get('currencyId')?.setValue(selectedVendor.currencyId);
  }

  GetAllSysAnalyticalCodes(){
    this.purchasesServicesService.GetAllSysAnalyticalCodes().subscribe(res=>{
      this.AllAnalyticalCode = res;
    })
  }

  onReturnTypeChange(event : MatSelectChange){
    if(event.value == 1 ){
      this.ReceiptNoteForm.get('trno')?.disable();
    }
  }


  onRectSourceTypeChange(event : MatSelectChange){
       if(event.value == 1 || (event.value >= 5 && event.value < 15)){
        this.purchasesServicesService.getAllCustomers().subscribe(res=>{
          this.AllRectSourceType = res
          this.FilteredAllRectSourceType = res
         })
       }

       if(event.value == 2 || (event.value >= 15 && event.value < 25)){
         this.purchasesServicesService.getAllVendor().subscribe(res=>{
          this.AllRectSourceType = res
          this.FilteredAllRectSourceType = res
         })
       }

       
       if(event.value == 4 || event.value == 35 || (event.value >= 25 && event.value < 34)){
        this.purchasesServicesService.getAllHrEmployees().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }

      if(event.value == 36 || event.value == 37){
        this.purchasesServicesService.getAllJobOrder().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }

      
      if(event.value >= 38 && event.value <= 47){
        this.purchasesServicesService.getAllSrVehicles().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }

      if(event.value >= 48 && event.value <= 50){
        this.purchasesServicesService.getAllSearchVehicleJobOrder().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }

      if(event.value >=  51 && event.value <= 60){
        this.purchasesServicesService.getAllMsLetterOfGuarantees().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }

      if(event.value >=  61 && event.value <= 63){
        this.purchasesServicesService.getAllSrJobOrderMotors().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }

      if(event.value >=  64 && event.value <= 66){
        this.purchasesServicesService.getAllRepairOrders().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }
      

      if(event.value >=  67 && event.value <= 77){
        this.purchasesServicesService.getAllAssetAssetCards().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }

      if(event.value >=  78 && event.value <= 88){
        this.purchasesServicesService.getAllProjProjects().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }
      
      if(event.value ==  34 ){
        this.purchasesServicesService.getAllCalAccountCharts().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }
  }


  onBookChange(event: MatSelectChange): void {
    this.purchasesServicesService.getAllMsTerms(event.value).subscribe(res=>{
     if(res.length > 0){
      this.AllTerms = res
      this.ReceiptNoteForm.get('termId')?.setValue(this.AllTerms[0].termId)
     }
    })
  }

  AddItemToPurchaseInvoice(){
    var _popup = this.dialog.open(AddItemsToSalesInvoiceComponent, {
      width: '80%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        Title: 'أضافه صنف',
      },
    });
    _popup.afterClosed().subscribe((response) => {
        if (response) {
          for (let i = 0; i < response.length; i++) {
            let item = response[i];
            let exists = this.itemCollections.some(existingItem => existingItem.itemCardId === item.itemCardId);
            let existsInDataBase;
  
            if(this.itemCollectionFromDataBase.length != 0){
              existsInDataBase = this.itemCollectionFromDataBase.some(i=>i.subItemId === item.itemCardId)
            }
            
            if (!exists && !existsInDataBase) {
              
              this.itemCollections.push(item);
  
            }else{
              this.toastr.info(`هذا الصنف ${item.itemDescA} موجود من قبل`)
            }
          }
      }
    });
  }
 

  updateItemCollection(itemCollection:any){
    var _popup = this.dialog.open(UpdateItemComponent, {
      width: '90%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        Title: 'تعديل',
        itemCollectionData : itemCollection,
      },
    });
    _popup.afterClosed().subscribe((response) => {
      if(response){
          this.itemCollections = this.itemCollections.filter(item => item.itemCardId !== itemCollection.itemCardId);
          this.itemCollections.push(response);
          this.toastr.success("تم التعديل بنجاح")
  
      }
    });
  }
  DeleteItemCollection(itemCardId:any){
    var _popup = this.dialog.open(DeleteConfirmComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
    _popup.afterClosed().subscribe((response) => {
      if (response) {
        this.itemCollections = this.itemCollections.filter(item => item.itemCardId !== itemCardId);
        this.toastr.success("تم المسح بنجاح")
      }
    });
  }


  updateItemCollectionFromDataBase(invoiceItem : any){
    var _popup = this.dialog.open(UpdateMsReturnPurchaseItemsComponent,{
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
       
  
      }
    });
  }
  
  DeleteItemCollectionFromDataBase(invItemCardId : any){
    
  }

  onCurrencyChange(event : MatSelectChange){
    const targetRate = this.AllCurrency.find(currency => currency.currencyId === event.value);
    this.ReceiptNoteForm.get('rate')?.setValue(targetRate.rate);
    this.getpaidPrice();
  }

  getSalesEmployess(){
  this.salesService.getSalesEmployees().subscribe(res=>{
    this.AllSalesEmployess = res;
    this.FilteredAllSalesEmployess = res;
  })
  }




  getAllSysBooksForSalesInvoice(){
    this.purchasesServicesService.getAllBooksForPurchaseInvoice().subscribe(res=>{
      if(res.length > 0){
        this.AllSysBooksForSalesInvoice = res
        this.ReceiptNoteForm.get('bookIdForSalesInvoice')?.setValue(this.AllSysBooksForSalesInvoice[0].bookId);
      }
    })
  }
  

  getInvoiceItems(){
  this.purchasesServicesService
  .GetPurchaseInvoiceItems(this.ReceiptNoteForm.value.trNo,this.ReceiptNoteForm.value.bookIdForSalesInvoice)
  .subscribe(res=>{
    this.itemCollections = res
  }) 
}


getBoxAccountValue(event: MatSelectChange): void {
  const selectedBoxBank = this.AllBankBox.find((acc) => acc.boxId === event.value);
   this.accountModuleService.GetAccountBalance(selectedBoxBank.accountId).subscribe(res=>{
     this.ReceiptNoteForm.get('balanceDebitLocal')?.setValue(res.balanceDebitLocal)
   })
}


getpaidPrice(){
  this.paidPriceValue = this.ReceiptNoteForm.value?.valueBeforeRate;
  this.RateValue = this.ReceiptNoteForm.value?.rate;
  this.ReceiptNoteForm.get('paidPrice')?.setValue(this.paidPriceValue * this.RateValue)
  this.ReceiptNoteForm.get('valueBeforeRateValue')?.setValue(this.paidPriceValue)
  this.ReceiptNoteForm.get('paidPriceValue')?.setValue(this.paidPriceValue * this.RateValue)
}


}

