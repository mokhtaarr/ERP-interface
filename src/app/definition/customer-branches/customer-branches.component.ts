import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DefinitionService } from '../definition.service';

@Component({
  selector: 'app-customer-branches',
  templateUrl: './customer-branches.component.html',
  styleUrls: ['./customer-branches.component.scss'],
})
export class CustomerBranchesComponent implements OnInit {
  customerData: any;
  CustomerBranchDataForm:any;
  AddCustomerBranch_Response?: number;
  ReadonlyCode : boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<CustomerBranchesComponent>,
    private definitionService: DefinitionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
   this.customerData = this.data;
   this.CustomerBranchDataForm = this.data.CustomerBranchData;
   this.fillForm();
  }

  customerBranchForm = this.fb.group({
    custBranchId: [],
    customerId: [],
    custBranchCode: [''],
    custBranchName1: [''],
    custBranchName2: [''],
    remarks: [''],
    address: [''],
  });

  onSumbit() {
    this.customerBranchForm.get('customerId')?.setValue(this.data.customerId);
    if (this.customerBranchForm.value.customerId) {
      this.definitionService
        .AddCustomerBranch(this.customerBranchForm.value)
        .subscribe((res) => {
          if (res.status) {
            this.AddCustomerBranch_Response = res.id;
            this.closepopup();
          }
        });
    }
  }

  closepopup() {
    this.ref.close(this.AddCustomerBranch_Response);
  }

  fillForm(){
    console.log(this.CustomerBranchDataForm)
    if(this.CustomerBranchDataForm){
        this.customerBranchForm.setValue({
          custBranchId: this.CustomerBranchDataForm.custBranchId,
          customerId: this.CustomerBranchDataForm.customerId,
          custBranchCode: this.CustomerBranchDataForm.custBranchCode,
          custBranchName1: this.CustomerBranchDataForm.custBranchName1,
          custBranchName2: this.CustomerBranchDataForm.custBranchName2,
          remarks: this.CustomerBranchDataForm.remarks,
          address: this.CustomerBranchDataForm.address
        });
        this.ReadonlyCode = true
    }
  }
}
