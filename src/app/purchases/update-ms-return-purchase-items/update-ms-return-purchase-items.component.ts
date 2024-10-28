import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { AccountService } from 'src/app/account/account.service';
import { DefinitionService } from 'src/app/definition/definition.service';
import { SalesService } from 'src/app/sales/sales.service';
import { PurchasesServicesService } from '../purchases-services.service';

@Component({
  selector: 'app-update-ms-return-purchase-items',
  templateUrl: './update-ms-return-purchase-items.component.html',
  styleUrls: ['./update-ms-return-purchase-items.component.scss']
})
export class UpdateMsReturnPurchaseItemsComponent implements OnInit{


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
    private ref: MatDialogRef<UpdateMsReturnPurchaseItemsComponent>,
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
    retPurchItemCardId:[],
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
        retPurchItemCardId: this.itemCollectionDataForm.retPurchItemCardId ?? null,
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
    this.purchasesServices.updateMsReturnPurchaseItems(this.itemCollectionForm.value).subscribe(res=>{
      if(res.status){
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
