import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DefinitionService } from '../definition.service';

@Component({
  selector: 'app-update-item-collection',
  templateUrl: './update-item-collection.component.html',
  styleUrls: ['./update-item-collection.component.scss']
})
export class UpdateItemCollectionComponent implements OnInit {
  ItemData: any;
  itemCollectionDataForm: any;
  AddItemCollection_Response: any;
  ReadonlyCode: boolean = false;
  itemUnits:any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UpdateItemCollectionComponent>,
    private definitionService: DefinitionService,
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.itemCollectionDataForm = this.data.itemCollectionData;
    this.fillForm();
  }


  itemCollectionForm = this.fb.group({
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
    if(this.itemCollectionDataForm){
      this.itemCollectionForm.setValue({
        itemCardId: this.itemCollectionDataForm.itemCardId ?? null,
        itemCode: this.itemCollectionDataForm.itemCode ?? null,
        itemDescA: this.itemCollectionDataForm.itemDescA ?? null,
        itemDescE: this.itemCollectionDataForm.itemDescE ?? null,
        itemType: this.itemCollectionDataForm.itemType ?? null,
        unitId: this.itemCollectionDataForm.unitId ?? null,
        unitRate: this.itemCollectionDataForm.unitRate ?? null,
        unitNam: this.itemCollectionDataForm.unitNam ?? null,
        quantity: this.itemCollectionDataForm.quantity ?? null,
        remarks: this.itemCollectionDataForm.remarks ?? null
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
    this.AddItemCollection_Response = this.itemCollectionForm.value;
    this.closepopup();
  }

  closepopup(){
    this.ref.close(this.AddItemCollection_Response);
  }
}
