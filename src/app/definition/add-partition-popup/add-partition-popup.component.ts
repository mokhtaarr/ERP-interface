import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Branches } from '../definition-models/Branches';
import { DefinitionService } from '../definition.service';
import { PartitionPopupComponent } from '../partition-popup/partition-popup.component';

@Component({
  selector: 'app-add-partition-popup',
  templateUrl: './add-partition-popup.component.html',
  styleUrls: ['./add-partition-popup.component.scss']
})
export class AddPartitionPopupComponent implements OnInit {

  Add_inputdata : any;
  AllBranches: Branches[] = [];
  Popup_Response : any;
  update_Partition : any;
  Add_Readonly_Effect : boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data : any,private ref:MatDialogRef<AddPartitionPopupComponent>,
  private definitionService : DefinitionService,private fb:FormBuilder){

  }
  ngOnInit(): void {
    this.Add_inputdata = this.data;
  

  }

  PartitionForm = this.fb.group({
    storeId:[],
    partCode: ['',Validators.required], 
    partDescA: ['',Validators.required], 
    partDescE: [''], 
    remarks: [''], 
  })

  onSumbit(){
    this.definitionService.AddPartation(this.PartitionForm.value).subscribe(res=>{
      this.Popup_Response = res.storeId
      
      if(res.status == true)
       this.closepopup();
    });
    
  }


  closepopup(){
    this.ref.close(this.Popup_Response);
  }

}
