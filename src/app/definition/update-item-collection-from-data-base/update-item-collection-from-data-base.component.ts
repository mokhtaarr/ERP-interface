import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DefinitionService } from '../definition.service';

@Component({
  selector: 'app-update-item-collection-from-data-base',
  templateUrl: './update-item-collection-from-data-base.component.html',
  styleUrls: ['./update-item-collection-from-data-base.component.scss']
})
export class UpdateItemCollectionFromDataBaseComponent implements OnInit {
  ItemData: any;
  itemCollectionDataFormDataBase: any;
  ItemCollection_Response: any;
  ReadonlyCode: boolean = false;
  itemUnits:any[] = [];
  status : boolean = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UpdateItemCollectionFromDataBaseComponent>,
    private definitionService: DefinitionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.itemCollectionDataFormDataBase = this.data.itemCollectionData;
    this.fillForm();
  }

  itemCollectionForm = this.fb.group({
    itemCollectId:[],
    itemCardId:[],
    itemCode:[''],
    itemDescA:[''],
    itemDescE:[''],
    itemType:[],
    unitId:[],
    unitRate:[],
    unitNam:[''],
    quantity:[],
    remarks:[''],
  });

  
  fillForm(){
    if(this.itemCollectionDataFormDataBase){
      this.itemCollectionForm.setValue({
        itemCollectId: this.itemCollectionDataFormDataBase.itemCollectId ?? null,
        itemCardId: this.itemCollectionDataFormDataBase.subItemId ?? null,
        itemCode: this.itemCollectionDataFormDataBase.itemCode ?? null,
        itemDescA: this.itemCollectionDataFormDataBase.itemDescA ?? null,
        itemDescE: this.itemCollectionDataFormDataBase.itemDescE ?? null,
        itemType: this.itemCollectionDataFormDataBase.itemType ?? null,
        unitId: this.itemCollectionDataFormDataBase.unitId ?? null,
        unitRate: this.itemCollectionDataFormDataBase.unitRate ?? null,
        unitNam: this.itemCollectionDataFormDataBase.unitNam ?? null,
        quantity: this.itemCollectionDataFormDataBase.quantity ?? null,
        remarks: this.itemCollectionDataFormDataBase.remarks ?? null
      });
      this.ReadonlyCode = true;
      this.GetItemUnitsForItemCollection();
    }
  }


  GetItemUnitsForItemCollection(){
    this.definitionService.GetItemUnitsForItemCollection(this.itemCollectionForm.value.itemCardId).subscribe(res=>{
     this.itemUnits = res
    })
   }

   
  onSumbit(){
   this.definitionService.UpdateItemCollection(this.itemCollectionForm.value).subscribe(res=>{
    if(res.status){
      this.status = res.status;
      this.closepopup();
    }
   })
    
  }

  
  closepopup(){
    this.ref.close(this.status);
  }

}
