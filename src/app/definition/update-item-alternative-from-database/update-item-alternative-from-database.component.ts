import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DefinitionService } from '../definition.service';

@Component({
  selector: 'app-update-item-alternative-from-database',
  templateUrl: './update-item-alternative-from-database.component.html',
  styleUrls: ['./update-item-alternative-from-database.component.scss']
})
export class UpdateItemAlternativeFromDatabaseComponent implements OnInit {
 
  ItemData: any;
  itemAlterDataFormDataBase: any;
  ItemAlter_Response: any;
  ReadonlyCode: boolean = false;
  itemUnits:any[] = [];
  status : boolean = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UpdateItemAlternativeFromDatabaseComponent>,
    private definitionService: DefinitionService,
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.itemAlterDataFormDataBase = this.data.itemAlterData;
    this.fillForm();
  }

  itemAlterForm = this.fb.group({
    alterId:[],
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
    if(this.itemAlterDataFormDataBase){
      this.itemAlterForm.setValue({
        alterId: this.itemAlterDataFormDataBase.alterId ?? null,
        itemCardId: this.itemAlterDataFormDataBase.alterItemCardId ?? null,
        itemCode: this.itemAlterDataFormDataBase.itemCode ?? null,
        itemDescA: this.itemAlterDataFormDataBase.itemDescA ?? null,
        itemDescE: this.itemAlterDataFormDataBase.itemDescE ?? null,
        itemType: this.itemAlterDataFormDataBase.itemType ?? null,
        unitId: this.itemAlterDataFormDataBase.unitId ?? null,
        unitRate: this.itemAlterDataFormDataBase.unitRate ?? null,
        unitNam: this.itemAlterDataFormDataBase.unitNam ?? null,
        quantity: this.itemAlterDataFormDataBase.quantity ?? null,
        remarks: this.itemAlterDataFormDataBase.remarks ?? null
      });
      this.ReadonlyCode = true;
      this.GetItemUnitsForItemCollection();
    }
  }

  GetItemUnitsForItemCollection(){
    this.definitionService.GetItemUnitsForItemCollection(this.itemAlterForm.value.itemCardId).subscribe(res=>{
     this.itemUnits = res
    })
   }

   onSumbit(){
    this.definitionService.UpdateItemAlter(this.itemAlterForm.value).subscribe(res=>{
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
