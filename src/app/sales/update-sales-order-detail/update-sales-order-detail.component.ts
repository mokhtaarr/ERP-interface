import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { AccountService } from 'src/app/account/account.service';
import { DefinitionService } from 'src/app/definition/definition.service';
import { PurchasesServicesService } from 'src/app/purchases/purchases-services.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-update-sales-order-detail',
  templateUrl: './update-sales-order-detail.component.html',
  styleUrls: ['./update-sales-order-detail.component.scss']
})
export class UpdateSalesOrderDetailComponent implements OnInit{


  ItemData: any;
  itemCollectionDataForm: any;
  AddItemCollection_Response: any;
  ReadonlyCode: boolean = false;
  itemUnits:any[] = [];
  AllStores : any[] = [];
  AllPartitions : any[] = [];
  userStoreId : any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UpdateSalesOrderDetailComponent>,
    private purchasesServices: PurchasesServicesService,
    private fb: FormBuilder,
    private definitionService:DefinitionService,
    public accountService : AccountService,
    private salesService : SalesService
  ) {}

  ngOnInit(): void {
    this.itemCollectionDataForm = this.data.itemCollectionData;
    this.fillForm();
    this.getUserInfo();
  }


  itemCollectionForm = this.fb.group({
    salesOrdertemCardId:[],
    itemCardId:[],
    itemCode:[''],
    itemDescA:[''],
    itemDescE:[''],
    unitId:[],
    unitRate:[],
    unitNam:[''],
    quantity:[],
    remarks:[''],
    remarks2:[''],
    remarks3:[''],
    barCode:[''],
    price:[],
    storeId:[],
    storePartId:[],
    storeCode:[''],
    storeDescA:[''],
    partCode:[''],
    partDescA:[''],
  });



  fillForm(){
    if(this.itemCollectionDataForm){
      this.itemCollectionForm.setValue({
        itemCardId: this.itemCollectionDataForm.itemCardId ?? null,
        itemCode: this.itemCollectionDataForm.itemCode ?? null,
        itemDescA: this.itemCollectionDataForm.itemCardDesc ?? null,
        itemDescE: this.itemCollectionDataForm.itemCardDescE ?? null,
        unitId: this.itemCollectionDataForm.unitId ?? null,
        unitRate: this.itemCollectionDataForm.unitRate ?? null,
        unitNam: this.itemCollectionDataForm.unitNam ?? null,
        quantity: this.itemCollectionDataForm.quantity ?? null,
        remarks: this.itemCollectionDataForm.remarks ?? null,
        remarks2: this.itemCollectionDataForm.remarks2 ?? null,
        remarks3: this.itemCollectionDataForm.remarks3 ?? null,
        price: this.itemCollectionDataForm.price ?? null,
        barCode: this.itemCollectionDataForm.barCode ?? '',
        storeId: this.itemCollectionDataForm.storeId ?? null,
        storePartId: this.itemCollectionDataForm.storePartId ?? null,
        storeCode: this.itemCollectionDataForm.storeCode ?? null,
        storeDescA: this.itemCollectionDataForm.storeDescA ?? null,
        partCode: this.itemCollectionDataForm.partCode ?? null,
        partDescA: this.itemCollectionDataForm.partDescA ?? null,
        salesOrdertemCardId: this.itemCollectionDataForm.salesOrdertemCardId ?? null,
      });
      this.ReadonlyCode = true
      this.GetItemUnitsForItemCollection();
    }
  }

  GetItemUnitsForItemCollection(){
   this.definitionService.GetItemUnitsForItemCollection(this.itemCollectionForm.value.itemCardId).subscribe(res=>{
    this.itemUnits = res
   })
  }


  
  onUnitChange(event: MatSelectChange){
    const selectedUnit = this.itemUnits.find(
      (unit) => unit.unitId === event.value
    );

    this.purchasesServices.getBarCode(selectedUnit.unitId).subscribe(res=>{
      this.itemCollectionForm.get('barCode')?.setValue(res.barCode)
    })

    this.purchasesServices.getUnitPrice(selectedUnit.unitId).subscribe(res=>{
      this.itemCollectionForm.get('price')?.setValue(res.barCode)
    })
  }


   onSumbit(){
    this.salesService.updateMsSalesOrder(this.itemCollectionForm.value).subscribe(res=>{
      if(res){
        this.closepopup();
      }
    })
   }

   closepopup(){
    this.ref.close(true);
   }


   cansel(){
    this.ref.close();
   }


   getUserInfo(){
    this.accountService.currentUser$.subscribe(res =>{
      this.userStoreId = res?.storeId;

      this.salesService.GetUserStores(this.userStoreId).subscribe((res : any)=>{
        this.AllStores = res
        this.itemCollectionForm.get('storeId')?.setValue(this.AllStores[0].storeId)
      });

      this.salesService.GetUserPartition(this.userStoreId).subscribe(res=>{
        this.AllPartitions = res
      })
      })
  }
  
}

