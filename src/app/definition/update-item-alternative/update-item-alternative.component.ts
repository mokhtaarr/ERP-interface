import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DefinitionService } from '../definition.service';

@Component({
  selector: 'app-update-item-alternative',
  templateUrl: './update-item-alternative.component.html',
  styleUrls: ['./update-item-alternative.component.scss']
})
export class UpdateItemAlternativeComponent implements OnInit {
  ItemData: any;
  itemAlternativeDataForm: any;
  ItemAlternative_Response: any;
  ReadonlyCode: boolean = false;
  itemUnits:any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UpdateItemAlternativeComponent>,
    private definitionService: DefinitionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.itemAlternativeDataForm = this.data.itemAlterData;
    this.fillForm();
  }


  itemAlterForm = this.fb.group({
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
    if(this.itemAlternativeDataForm){
      this.itemAlterForm.setValue({
        itemCardId: this.itemAlternativeDataForm.itemCardId ?? null,
        itemCode: this.itemAlternativeDataForm.itemCode ?? null,
        itemDescA: this.itemAlternativeDataForm.itemDescA ?? null,
        itemDescE: this.itemAlternativeDataForm.itemDescE ?? null,
        itemType: this.itemAlternativeDataForm.itemType ?? null,
        unitId: this.itemAlternativeDataForm.unitId ?? null,
        unitRate: this.itemAlternativeDataForm.unitRate ?? null,
        unitNam: this.itemAlternativeDataForm.unitNam ?? null,
        quantity: this.itemAlternativeDataForm.quantity ?? null,
        remarks: this.itemAlternativeDataForm.remarks ?? null
      });
      this.ReadonlyCode = true
      this.GetItemUnitsForItemAlter();
    }
  }

  GetItemUnitsForItemAlter(){
    this.definitionService.GetItemUnitsForItemCollection(this.itemAlterForm.value.itemCardId).subscribe(res=>{
     this.itemUnits = res
    })
   }

   onSumbit(){
    this.itemUnits = this.itemUnits.filter(u=>u.unitId == this.itemAlterForm.value.unitId)
    this.itemAlterForm.get('unitNam')?.setValue(this.itemUnits[0].unitNam)
    this.ItemAlternative_Response = this.itemAlterForm.value;
    this.closepopup();
  }

  closepopup(){
    this.ref.close(this.ItemAlternative_Response);
  }

}
