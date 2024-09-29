import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { DefinitionService } from 'src/app/definition/definition.service';
import { PurchasesServicesService } from '../purchases-services.service';

@Component({
  selector: 'app-update-order-detail',
  templateUrl: './update-order-detail.component.html',
  styleUrls: ['./update-order-detail.component.scss']
})
export class UpdateOrderDetailComponent {
  ItemData: any;
  itemCollectionDataForm: any;
  AddItemCollection_Response: any;
  ReadonlyCode: boolean = false;
  itemUnits:any[] = [];
  AllStores : any[] = [];
  AllPartitions : any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UpdateOrderDetailComponent>,
    private purchasesServices: PurchasesServicesService,
    private fb: FormBuilder,
    private definitionService:DefinitionService
  ) {}

  ngOnInit(): void {
    this.itemCollectionDataForm = this.data.itemCollectionData;
    this.fillForm();
    this.getAllPartitions();
    this.getAllStores();
  }

  itemCollectionForm = this.fb.group({
    orderDetailItemReqId:[],
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
        orderDetailItemReqId : this.itemCollectionDataForm.orderDetailItemReqId ?? null,
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
        partDescA: this.itemCollectionDataForm.partDescA ?? null
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


  onSumbit(){
    this.purchasesServices.updateOrderDetail(this.itemCollectionForm.value).subscribe(res=>{
      if(res){
        this.closepopup();
      }
    })
  }

  closepopup(){
    this.ref.close(true);
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

  getAllStores(){
   this.purchasesServices.GetAllStores().subscribe(res=>{
    this.AllStores = res;
   })
  }

  getAllPartitions(){
    this.purchasesServices.GetAllPartition().subscribe(res=>{
     this.AllPartitions = res;
    })
   }


   cancel(){
    this.ref.close();
   }


}
