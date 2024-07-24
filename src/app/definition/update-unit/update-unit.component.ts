import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DefinitionService } from '../definition.service';

@Component({
  selector: 'app-update-unit',
  templateUrl: './update-unit.component.html',
  styleUrls: ['./update-unit.component.scss']
})
export class UpdateUnitComponent implements OnInit {
  ItemData: any;
  Id:any;
  itemUnitDataForm: any;
  AddItemUnit_Response: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UpdateUnitComponent>,
    private definitionService: DefinitionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.itemUnitDataForm = this.data.itemUnitData;
    this.Id = this.data.basicId
    this.fillForm();

  }

  itemUnitForm = this.fb.group({
    cannotDevide: [],
    basUnitId: [],
    unitCode: [''],
    unitNam: ['',Validators.required],
    unitNameE: [''],
    unittRate: [],
    symbol: [''],
    remarks:[''],
  });

  fillForm(){
    if(this.itemUnitDataForm){
      this.itemUnitForm.setValue({
        cannotDevide: this.itemUnitDataForm.cannotDevide ??  null,
        basUnitId: this.itemUnitDataForm.basUnitId ??  null,
        unitCode: this.itemUnitDataForm.unitCode ??  null,
        unitNam: this.itemUnitDataForm.unitNam ??  null,
        unitNameE: this.itemUnitDataForm.unitNameE ??  null,
        unittRate: this.itemUnitDataForm.unittRate ??  null,
        symbol: this.itemUnitDataForm.symbol ??  null,
        remarks: this.itemUnitDataForm.remarks ??  null,
      })
    }
  }


  closepopup() {
    this.ref.close(this.Id);
  }

  onSumbit(){
    this.definitionService.updateUnit(this.itemUnitForm.value).subscribe(res=>{
      if(res.status){
        this.closepopup();  
      }
      
    })
  }

}
