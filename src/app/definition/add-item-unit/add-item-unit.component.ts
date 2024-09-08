import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DefinitionService } from '../definition.service';

@Component({
  selector: 'app-add-item-unit',
  templateUrl: './add-item-unit.component.html',
  styleUrls: ['./add-item-unit.component.scss'],
})
export class AddItemUnitComponent implements OnInit{
  ItemData: any;
  itemUnitDataForm: any;
  AddItemUnit_Response: any;
  ReadonlyCode: boolean = false;

  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<AddItemUnitComponent>,
    private definitionService: DefinitionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
   this.itemUnitDataForm = this.data.itemUnitData;
   this.fillForm();
  }

  itemUnitForm = this.fb.group({
    isDefaultPurchas: [],
    isDefaultSale: [],
    cannotDevide: [],
    unitId: [],
    itemCardId:[],
    unitCode: [''],
    unitNam: ['',Validators.required],
    unitNameE: [''],
    etaxUnitCode: [''],
    unittRate: [],
    symbol: [''],
    quantity1: [],
    price1: [],
    quantity2: [],
    price2: [],
    quantity3: [],
    price3: [],
    quantity4: [],
    price4: [],
    quantity5: [],
    price5: [],
    price6: [],
    price7: [],
    price8: [],
    price9: [],
    price10: [],
    barCode1: [''],
    barCode2: [''],
    barCode3: [''],
    barCode4: [''],
    barCode5: [''],
    barCode6: [''],
    barCode7: [''],
    barCode8: [''],
    barCode9: [''],
    barCode10: [''],
    barCode11: [''],
    barCode12: [''],
    barCode13: [''],
    barCode14: [''],
    barCode15: [''],
  });

  onSumbit(){
    // this.itemUnitForm.get('itemCardId')?.setValue(this.data.itemCardId);
    // if (this.itemUnitForm.value.itemCardId) {
    //   this.definitionService
    //     .AddItemUnit(this.itemUnitForm.value)
    //     .subscribe((res) => {
    //       if (res.status) {
    //         this.AddItemUnit_Response = res.id;
    //         this.closepopup();
    //       }
    //     });
    // }

    this.AddItemUnit_Response = this.itemUnitForm.value
     this.closepopup();

  }

  closepopup() {
    this.ref.close(this.AddItemUnit_Response);
  }

  fillForm(){
    if(this.itemUnitDataForm){
      this.itemUnitForm.setValue({
        isDefaultPurchas: this.itemUnitDataForm.isDefaultPurchas ?? null,
        isDefaultSale: this.itemUnitDataForm.isDefaultSale ?? null,
        cannotDevide: this.itemUnitDataForm.cannotDevide ?? null,
        unitId: this.itemUnitDataForm.unitId ?? null,
        itemCardId: this.itemUnitDataForm.itemCardId ?? null,
        unitCode: this.itemUnitDataForm.unitCode ?? null,
        unitNam: this.itemUnitDataForm.unitNam ?? null,
        unitNameE: this.itemUnitDataForm.unitNameE ?? null,
        etaxUnitCode: this.itemUnitDataForm.etaxUnitCode ?? null,
        unittRate: this.itemUnitDataForm.unittRate ?? null,
        symbol: this.itemUnitDataForm.symbol ?? null,
        quantity1: this.itemUnitDataForm.quantity1 ?? null,
        price1: this.itemUnitDataForm.price1 ?? null,
        quantity2: this.itemUnitDataForm.quantity2 ?? null,
        price2: this.itemUnitDataForm.price2 ?? null,
        quantity3: this.itemUnitDataForm.quantity3 ?? null,
        price3: this.itemUnitDataForm.price3 ?? null,
        quantity4: this.itemUnitDataForm.quantity4 ?? null,
        price4: this.itemUnitDataForm.price4 ?? null,
        quantity5: this.itemUnitDataForm.quantity5 ?? null,
        price5: this.itemUnitDataForm.price5 ?? null,
        price6: this.itemUnitDataForm.price6 ?? null,
        price7: this.itemUnitDataForm.price7 ?? null,
        price8: this.itemUnitDataForm.price8 ?? null,
        price9: this.itemUnitDataForm.price9 ?? null,
        price10: this.itemUnitDataForm.price10 ?? null,
        barCode1: this.itemUnitDataForm.barCode1 ?? null,
        barCode2: this.itemUnitDataForm.barCode2 ?? null,
        barCode3: this.itemUnitDataForm.barCode3 ?? null,
        barCode4: this.itemUnitDataForm.barCode4 ?? null,
        barCode5: this.itemUnitDataForm.barCode5 ?? null,
        barCode6: this.itemUnitDataForm.barCode6 ?? null,
        barCode7: this.itemUnitDataForm.barCode7 ?? null,
        barCode8: this.itemUnitDataForm.barCode8 ?? null,
        barCode9: this.itemUnitDataForm.barCode9 ?? null,
        barCode10: this.itemUnitDataForm.barCode10 ?? null,
        barCode11: this.itemUnitDataForm.barCode11 ?? null,
        barCode12: this.itemUnitDataForm.barCode12 ?? null,
        barCode13: this.itemUnitDataForm.barCode13 ?? null,
        barCode14: this.itemUnitDataForm.barCode14 ?? null,
        barCode15: this.itemUnitDataForm.barCode14 ?? null,
      });
      this.ReadonlyCode = true
  }
  }

}
