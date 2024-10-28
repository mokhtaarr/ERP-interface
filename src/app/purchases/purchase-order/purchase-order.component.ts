import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PurchasesServicesService } from '../purchases-services.service';
import { ToastrService } from 'ngx-toastr';
import { AddItemComponent } from '../add-item/add-item.component';
import { MatSelectChange } from '@angular/material/select';
import { UpdateItemComponent } from '../update-item/update-item.component';
import { DeleteConfirmComponent } from 'src/app/definition/delete-confirm/delete-confirm.component';
import { UpdateOrderDetailComponent } from '../update-order-detail/update-order-detail.component';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent  implements OnInit {

 

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
  AddItemDisable : boolean = true;

  AllPurchaseOrder:any[] = [];
  
  readonlyTable: boolean = true;
  newDisable: boolean = false;

  purchaseOrderItemsData : any;

  trnoReadonly : boolean = false;
  trnoReadonly2 : boolean = true;
  addItemDisable : boolean = true;


  constructor(private purchasesServicesService: PurchasesServicesService , private fb:FormBuilder,private dialog: MatDialog,
    public toastr: ToastrService,public accountService : AccountService ){
  }


  ngOnInit(): void {
    this.PurchaseOrderForm.disable();
    this.getAllSysBooks();
    this.getAllVendor();
    this.GetAllCurrency();
    this.GetAllSysAnalyticalCodes();
    this.GetAllPurchaseOrder();
 }


  PurchaseOrderForm = this.fb.group({
   purOrderReqId:[],
   bookId:[],
   vendorId:[,Validators.required],
   currencyId:[],
   trDate:[],
   invoiceType:[],
   manualTrNo:[''],
   aid:[],
   arrivalDate:[],
   expiryDate:[],
   deliveryPeriodDays:[],
   payPeriodDays:[],
   trno:[],
   purchaseOrderItems :[[]],
   storeId:[''],
   CreatedBy:[''],
  })

 
  GetAllPurchaseOrder(){
    this.purchasesServicesService.GetAllMsPurchasOrderRequest().subscribe(res=>{
      this.AllPurchaseOrder = res;
    })
  }

  onSumbit(){
    this.purchaseOrderItemsData = this.itemCollections;
    if(this.purchaseOrderItemsData != null){
      this.PurchaseOrderForm.get("purchaseOrderItems")?.setValue(this.purchaseOrderItemsData)
    }


    this.purchasesServicesService.AddMsPurchasOrderRequest(this.PurchaseOrderForm.value).subscribe(res=>{
      if(res.status){
        this.GetAllPurchaseOrder();
        this.PurchaseOrderForm.disable();
        this.PurchaseOrderForm.get('purOrderReqId')?.setValue(res.id);
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

      }}
    )
  }


  updatePurchaseOrder(){
    this.getUserInfo();
    this.trnoReadonly = true;
    this.PurchaseOrderForm.enable();
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
    this.undoIndex = this.AllPurchaseOrder.findIndex(p=>p.purOrderReqId == this.PurchaseOrderForm.value.purOrderReqId);
    this.readonlyTable = false;
    this.AddItemDisable = false;
  }
 
  getOrderDetails(){
    
    this.itemCollectionFromDataBase = []
    this.itemCollections = [];
    
    this.purchasesServicesService.getMsPurchOrderReqDetail(this.PurchaseOrderForm.value.purOrderReqId).subscribe(res=>{
      this.itemCollectionFromDataBase = res
    })
  }

  New(){
    this.PurchaseOrderForm.enable();
    this.readonlyTable = false;
    this.newDisable = true;
    this.AddItemDisable = false;
    this.itemCollections = [];
    this.itemCollectionFromDataBase = [];
    this.undoIndex = this.AllPurchaseOrder.findIndex(
      (p) => p.purOrderReqId == this.PurchaseOrderForm.value.purOrderReqId
    );
    this.PurchaseOrderForm.setValue({
      purOrderReqId: null,
      bookId: null,
      vendorId: null,
      currencyId: null,
      trDate: null,
      invoiceType: null,
      manualTrNo: null,
      aid: null,
      arrivalDate: null,
      expiryDate: null,
      deliveryPeriodDays: null,
      payPeriodDays: null,
      storeId: null,
      trno: null,
      purchaseOrderItems: null,
      CreatedBy: null
    });

    this.getUserInfo();

    this.PurchaseOrderForm.get('bookId')?.setValue(this.AllSysBooks[0].bookId)
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


  getLastRowData(){
    const LastItem = this.AllPurchaseOrder[this.AllPurchaseOrder.length - 1];
    if (LastItem) {
      this.PurchaseOrderForm.setValue({
        purOrderReqId: LastItem.purOrderReqId,
        bookId: LastItem.bookId,
        vendorId: LastItem.vendorId,
        currencyId: LastItem.currencyId,
        trDate: LastItem.trDate,
        invoiceType: LastItem.invoiceType,
        manualTrNo: LastItem.manualTrNo,
        aid: LastItem.aid,
        arrivalDate: LastItem.arrivalDate,
        expiryDate: LastItem.expiryDate,
        deliveryPeriodDays: LastItem.deliveryPeriodDays,
        payPeriodDays: LastItem.payPeriodDays,
        storeId: LastItem.storeId ?? null,
        trno: LastItem.trNo ?? null,
        purchaseOrderItems: null,
        CreatedBy: null
      });

      this.itemCollectionFromDataBase = []
      this.itemCollections = [];

      this.getOrderDetails();
      
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
    const index = this.AllPurchaseOrder.findIndex(
      (p) => p.purOrderReqId == this.PurchaseOrderForm.value.purOrderReqId
    );

    const nextItem = this.AllPurchaseOrder[index + 1];

    if (nextItem) {
      this.PurchaseOrderForm.setValue({
        purOrderReqId: nextItem.purOrderReqId,
        bookId: nextItem.bookId,
        vendorId: nextItem.vendorId,
        currencyId: nextItem.currencyId,
        trDate: nextItem.trDate,
        invoiceType: nextItem.invoiceType,
        manualTrNo: nextItem.manualTrNo,
        aid: nextItem.aid,
        arrivalDate: nextItem.arrivalDate,
        expiryDate: nextItem.expiryDate,
        deliveryPeriodDays: nextItem.deliveryPeriodDays,
        payPeriodDays: nextItem.payPeriodDays,
        storeId: nextItem.storeId ?? null,
        trno: nextItem.trNo ?? null,
        purchaseOrderItems: null,
        CreatedBy: null
      });

      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      
      this.getOrderDetails();

      this.firstRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.trnoReadonly = false;


      const LastItem = this.AllPurchaseOrder.findIndex(
        (p) => p.purOrderReqId == this.PurchaseOrderForm.value.purOrderReqId
      );

      if (this.AllPurchaseOrder.length - 1 === LastItem) {
        this.DisabledNextButton = true;
        this.lastRow = true;
      }

      this.DisabledPrevButton = false;
    }

  }

  getPrevRowData(){
    const index = this.AllPurchaseOrder.findIndex(
      (p) => p.purOrderReqId == this.PurchaseOrderForm.value.purOrderReqId
    );

    if (index === 0 || index === -1) {
      this.DisabledPrevButton = true;
      this.firstRow = true;
    }

    const PrevItem = this.AllPurchaseOrder[index - 1];

    if (PrevItem) {
      this.PurchaseOrderForm.setValue({
        purOrderReqId: PrevItem.purOrderReqId,
        bookId: PrevItem.bookId,
        vendorId: PrevItem.vendorId,
        currencyId: PrevItem.currencyId,
        trDate: PrevItem.trDate,
        invoiceType: PrevItem.invoiceType,
        manualTrNo: PrevItem.manualTrNo,
        aid: PrevItem.aid,
        arrivalDate: PrevItem.arrivalDate,
        expiryDate: PrevItem.expiryDate,
        deliveryPeriodDays: PrevItem.deliveryPeriodDays,
        payPeriodDays: PrevItem.payPeriodDays,
        storeId: PrevItem.storeId ?? null,
        trno: PrevItem.trNo ?? null,
        purchaseOrderItems: null,
        CreatedBy: null
      });

      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      

      this.getOrderDetails();

      this.firstRow = false;
      this.lastRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.trnoReadonly = false;


      const firstItem = this.AllPurchaseOrder.findIndex(
        (p) => p.purOrderReqId == this.PurchaseOrderForm.value.purOrderReqId
      );

      if (firstItem === 0) {
        this.DisabledPrevButton = true;
        this.firstRow = true;
      }

      this.DisabledNextButton = false;
    }
  }

  getFirstRowData(){
    const FirstItem = this.AllPurchaseOrder[0];
    if (FirstItem) {
      this.PurchaseOrderForm.setValue({
        purOrderReqId: FirstItem.purOrderReqId,
        bookId: FirstItem.bookId,
        vendorId: FirstItem.vendorId,
        currencyId: FirstItem.currencyId,
        trDate: FirstItem.trDate,
        invoiceType: FirstItem.invoiceType,
        manualTrNo: FirstItem.manualTrNo,
        aid: FirstItem.aid,
        arrivalDate: FirstItem.arrivalDate,
        expiryDate: FirstItem.expiryDate,
        deliveryPeriodDays: FirstItem.deliveryPeriodDays,
        payPeriodDays: FirstItem.payPeriodDays,
        storeId: FirstItem.storeId ?? null,
        trno: FirstItem.trNo ?? null,
        purchaseOrderItems: null,
        CreatedBy: null
      });

      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      

      this.getOrderDetails();

      this.firstRow = true;
      this.lastRow = false;
      this.DisabledPrevButton = true;
      this.DisabledNextButton = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.trnoReadonly = false;

    }
  }

  Open_delete_confirm(){

  }

  undo(){
    this.PurchaseOrderForm.disable();
    this.readonlyTable = true;
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
    this.trnoReadonly = false;

    this.AddItemDisable = true;

    if (this.undoIndex != -1) {
      const undoItem = this.AllPurchaseOrder[this.undoIndex];

      if (undoItem.purOrderReqId != null) {
        this.DeleteDisable = false;
        this.UpdateDisable = false;

        this.PurchaseOrderForm.setValue({
          purOrderReqId: undoItem.purOrderReqId,
          bookId: undoItem.bookId,
          vendorId: undoItem.vendorId,
          currencyId: undoItem.currencyId,
          trDate: undoItem.trDate,
          invoiceType: undoItem.invoiceType,
          manualTrNo: undoItem.manualTrNo,
          aid: undoItem.aid,
          arrivalDate: undoItem.arrivalDate,
          expiryDate: undoItem.expiryDate,
          deliveryPeriodDays: undoItem.deliveryPeriodDays,
          payPeriodDays: undoItem.payPeriodDays,
          storeId: undoItem.storeId ?? null,
          trno: undoItem.trNo ?? null,
          purchaseOrderItems: null,
          CreatedBy: null
        });

        
        this.itemCollectionFromDataBase = []
        this.itemCollections = [];
      
        this.getOrderDetails();

      }
    }
  }

  

  getAllSysBooks(){
    this.purchasesServicesService.getAllBooks().subscribe(res=>{
      this.AllSysBooks = res
    })
  }

  getAllVendor(){
    this.purchasesServicesService.GetAllVendorForPurchaseInvoice().subscribe(res=>{
      this.AllVendor = res;
      this.FilteredAllVendors = res;
    })
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value;
    this.searchVendor(searchValue);
  }

  searchVendor(searchValue: string): void {
    if (!searchValue) {
      this.FilteredAllVendors = this.AllVendor;
      return;
    }

    this.FilteredAllVendors = this.AllVendor.filter((acc) =>
      acc.vendorCode.toString().includes(searchValue)
    );

    if (this.FilteredAllVendors.length === 0) {
      this.FilteredAllVendors = this.AllVendor.filter((acc) =>
        acc.vendorDescA.toString().includes(searchValue)
      );
    }

    if (this.FilteredAllVendors.length > 0) {
      this.PurchaseOrderForm.get('vendorId')?.setValue(
        this.FilteredAllVendors[0].vendorId
      );

      this.PurchaseOrderForm.get('currencyId')?.setValue(this.FilteredAllVendors[0].currencyId);

    }
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

  onAccountSelect(event: MatSelectChange): void {
    const selectedVendor = this.FilteredAllVendors.find(
      (acc) => acc.vendorId === event.value);
    this.PurchaseOrderForm.get('currencyId')?.setValue(selectedVendor.currencyId);
  }

  OpenItemCollectionList(){
    var _popup = this.dialog.open(AddItemComponent, {
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
  

  
updateItemCollectionFromDataBase(itemCollection:any){
  var _popup = this.dialog.open(UpdateOrderDetailComponent, {
    width: '90%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      Title: 'تعديل  ',
      itemCollectionData : itemCollection,
    },
  });
  _popup.afterClosed().subscribe((response) => {
    if(response){
      this.getOrderDetails();
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


DeleteItemCollectionFromDataBase(itemCollectId:any){
  // var _popup = this.dialog.open(DeleteConfirmComponent, {
  //   width: '30%',
  //   enterAnimationDuration: '1000ms',
  //   exitAnimationDuration: '1000ms',
  // });
  // _popup.afterClosed().subscribe((response) => {
  //   if (response) {
  //    this.definitionService.DeleteItemCollection(itemCollectId).subscribe(res=>{
  //     if(res.status){
  //       this.GetItemCollectionFromDataBase();
  //     }
  //    })
  //   }
  // });
}


getUserInfo(){
  this.accountService.currentUser$.subscribe(res =>{
    this.PurchaseOrderForm.get('CreatedBy')?.setValue(res!.userId)
    this.PurchaseOrderForm.get('storeId')?.setValue(res!.storeId)
    })
}



}
