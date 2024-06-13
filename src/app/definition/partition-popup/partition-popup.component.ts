import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DefinitionService } from '../definition.service';
import { Branches } from '../definition-models/Branches';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-partition-popup',
  templateUrl: './partition-popup.component.html',
  styleUrls: ['./partition-popup.component.scss']
})
export class PartitionPopupComponent implements OnInit {

  inputdata : any;
  AllBranches: Branches[] = [];
  Popup_Response : any;
  update_Partition : any;
  Add_Readonly_Effect : boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data : any,private ref:MatDialogRef<PartitionPopupComponent>,
  private definitionService : DefinitionService,private fb:FormBuilder){

  }
  ngOnInit(): void {
    this.inputdata = this.data;
    if(this.inputdata.partCode > 0){
      this.popup_update(this.inputdata.partCode)
    }

  }

  PartitionForm = this.fb.group({
    storeId:[],
    partCode: ['',Validators.required], 
    partDescA: ['',Validators.required], 
    partDescE: [''], 
    remarks: [''], 
  })

  onSumbit(){
    this.definitionService.UpdatePartition(this.PartitionForm.value).subscribe(res=>{
      this.Popup_Response = res
      this.closepopup();
    });
    
  }


  popup_update(partCode:string){
    this.definitionService.getParttion(partCode).subscribe(res=>{
      this.update_Partition = res;
      if(this.update_Partition){
        this.PartitionForm.setValue({
          partCode: this.update_Partition.partCode,
          partDescA: this.update_Partition.partDescA,
          partDescE: this.update_Partition.partDescE,
          remarks: this.update_Partition.remarks,
          storeId: this.update_Partition.storeId
        })

        this.Add_Readonly_Effect = true
      }
     
    })
  }

  closepopup(){
    this.ref.close(this.Popup_Response);
  }

 
}
