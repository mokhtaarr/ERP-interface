import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DefinitionService } from '../definition.service';

@Component({
  selector: 'app-add-vendor-branch',
  templateUrl: './add-vendor-branch.component.html',
  styleUrls: ['./add-vendor-branch.component.scss']
})
export class AddVendorBranchComponent implements OnInit {
  VendorData: any;
  VendorBranchDataForm:any;
  AddVendorBranch_Response?: number;
  ReadonlyCode : boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<AddVendorBranchComponent>,
    private definitionService: DefinitionService,
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.VendorBranchDataForm = this.data.VendorBranchData;
    this.fillForm();
  }

  VendorBranchForm = this.fb.group({
    vendBranchId: [],
    vendorId: [],
    vendBranchCode: ['',Validators.required],
    vendBranchName1: ['',Validators.required],
    vendBranchName2: [''],
    remarks: [''],
    address: [''],
  });


 

  onSumbit(){
    this.VendorBranchForm.get('vendorId')?.setValue(this.data.vendorId);

    if (this.VendorBranchForm.value.vendorId) {
      this.definitionService.AddVendorBranch(this.VendorBranchForm.value).subscribe((res) => {
          if (res.status) {
            this.AddVendorBranch_Response = res.id;
            this.closepopup();
          }
        });
    }
  }


  closepopup() {
    this.ref.close(this.AddVendorBranch_Response);
  }

  fillForm(){
    if(this.VendorBranchDataForm){
        this.VendorBranchForm.setValue({
          vendBranchId: this.VendorBranchDataForm.vendBranchId,
          vendorId: this.VendorBranchDataForm.vendorId,
          vendBranchCode: this.VendorBranchDataForm.vendBranchCode,
          vendBranchName1: this.VendorBranchDataForm.vendBranchName1 ,
          vendBranchName2: this.VendorBranchDataForm.vendBranchName2,
          remarks: this.VendorBranchDataForm.remarks,
          address: this.VendorBranchDataForm.address
        });
        this.ReadonlyCode = true
    }
  }
}
