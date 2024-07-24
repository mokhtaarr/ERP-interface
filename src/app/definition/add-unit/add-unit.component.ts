import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DefinitionService } from '../definition.service';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.scss']
})
export class AddUnitComponent implements OnInit {

  ParentName:any;
  ParentUnitId:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<AddUnitComponent>,
    private definitionService: DefinitionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.ParentName = this.data.ParentName;
    this.ParentUnitId = this.data.ParentUnitId;
    this.fillform();
  }

  UnitForm = this.fb.group({
    cannotDevide: [],
    basUnitId: [],
    unitCode: [''],
    unitNam: ['',Validators.required],
    unitNameE: [''],
    unittRate: [],
    symbol: [''],
    remarks:[''],
    parentUnit:[],
    parentName:['']
  });

  fillform(){
    this.UnitForm.setValue({
      cannotDevide: null,
      basUnitId: null,
      unitCode: null,
      unitNam: null,
      unitNameE: null,
      unittRate: null,
      symbol: null,
      remarks: null,
      parentUnit: this.ParentUnitId,
      parentName: this.ParentName
    });
  }

  onSumbit(){
    this.definitionService.AddUnit(this.UnitForm.value).subscribe(res=>{
      if(res.status){
        this.closepopup();  
      }
    })
  }

  closepopup() {
    this.ref.close(this.ParentUnitId);
  }
}
