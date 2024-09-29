import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DefinitionService } from '../definition/definition.service';
import { PurchasesServicesService } from '../purchases/purchases-services.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-update-order-purchase-detail',
  templateUrl: './update-order-purchase-detail.component.html',
  styleUrls: ['./update-order-purchase-detail.component.scss']
})
export class UpdateOrderPurchaseDetailComponent {
  ItemData: any;
  itemCollectionDataForm: any;
  AddItemCollection_Response: any;
  ReadonlyCode: boolean = false;
  itemUnits:any[] = [];
  AllStores : any[] = [];
  AllPartitions : any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UpdateOrderPurchaseDetailComponent>,
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
        itemDescA: this.itemCollectionDataForm.itemDescA ?? null,
        itemDescE: this.itemCollectionDataForm.itemDescE ?? null,
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
    this.itemUnits = this.itemUnits.filter(u=>u.unitId == this.itemCollectionForm.value.unitId)
    this.itemCollectionForm.get('unitNam')?.setValue(this.itemUnits[0].unitNam)

    this.AllStores = this.AllStores.filter(s=>s.storeId == this.itemCollectionForm.value.storeId)
    this.itemCollectionForm.get('storeCode')?.setValue(this.AllStores[0].storeCode)
    this.itemCollectionForm.get('storeDescA')?.setValue(this.AllStores[0].storeDescA)

    this.AllPartitions = this.AllPartitions.filter(p=>p.storePartId == this.itemCollectionForm.value.storePartId)
    this.itemCollectionForm.get('partCode')?.setValue(this.AllPartitions[0]?.partCode)
    this.itemCollectionForm.get('partDescA')?.setValue(this.AllPartitions[0]?.partDescA)


    this.AddItemCollection_Response = this.itemCollectionForm.value;
    this.closepopup();
  }

  closepopup(){
    this.ref.close(this.AddItemCollection_Response);
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




}
