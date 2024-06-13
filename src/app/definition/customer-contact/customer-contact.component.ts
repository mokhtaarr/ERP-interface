import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DefinitionService } from '../definition.service';

@Component({
  selector: 'app-customer-contact',
  templateUrl: './customer-contact.component.html',
  styleUrls: ['./customer-contact.component.scss']
})
export class CustomerContactComponent implements OnInit {
  customerData: any;
  CustomerContactDataForm:any;
  AddCustomerContact_Response?: number;
  ReadonlyCode : boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<CustomerContactComponent>,
    private definitionService: DefinitionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
   this.customerData = this.data;
   this.CustomerContactDataForm = this.data.CustomerContactData;
   this.fillForm();
  }

  customerContactForm = this.fb.group({
    custContactId: [],
    customerId: [],
    contactCode: ['',Validators.required],
    contactName1: ['',Validators.required],
    contactName2: [''],
    contactPhone1: ['',Validators.required],
    contactPhone2: [''],
    contactPhone3: [''],
    contactPhone4: [''],
    contactPhone5: [''],
    contactAddress1:[''],
    contactAddress2:[''],
    contactAddress3:[''],
    contactEmail1:[''],
    contactEmail2:[''],
    contactEmail3:[''],
    idno:[''],
    passPortNo:[''],
    bank1:[''],
    bank2:[''],
    bank3:[''],
    bankAccNo1:[''],
    bankAccNo2:[''],
    bankAccNo3:[''],
    remark1:[''],
    remark2:[''],
    isprimary:[]
  });

  onSumbit() {
    this.customerContactForm.get('customerId')?.setValue(this.data.customerId);
    if (this.customerContactForm.value.customerId) {
      this.definitionService.AddCustomerContact(this.customerContactForm.value).subscribe((res) => {
          if (res.status) {
            this.AddCustomerContact_Response = res.id;
            this.closepopup();
          }
        });
    }
  }

  closepopup() {
    this.ref.close(this.AddCustomerContact_Response);
  }

  fillForm(){
    if(this.CustomerContactDataForm){
        this.customerContactForm.setValue({
          custContactId: this.CustomerContactDataForm.custContactId,
          customerId: this.CustomerContactDataForm.customerId,
          contactCode: this.CustomerContactDataForm.contactCode,
          contactName1: this.CustomerContactDataForm.contactName1,
          contactName2: this.CustomerContactDataForm.contactName2,
          contactPhone1: this.CustomerContactDataForm.contactPhone1,
          contactPhone2: this.CustomerContactDataForm.contactPhone2,
          contactPhone3: this.CustomerContactDataForm.contactPhone3,
          contactPhone4: this.CustomerContactDataForm.contactPhone4,
          contactPhone5: this.CustomerContactDataForm.contactPhone5,
          contactAddress1: this.CustomerContactDataForm.contactAddress1,
          contactAddress2: this.CustomerContactDataForm.contactAddress2,
          contactAddress3: this.CustomerContactDataForm.contactAddress3,
          contactEmail1: this.CustomerContactDataForm.contactEmail1,
          contactEmail2: this.CustomerContactDataForm.contactEmail2,
          contactEmail3: this.CustomerContactDataForm.contactEmail3,
          idno: this.CustomerContactDataForm.idno,
          passPortNo: this.CustomerContactDataForm.passPortNo,
          bank1: this.CustomerContactDataForm.bank1,
          bank2: this.CustomerContactDataForm.bank2,
          bank3: this.CustomerContactDataForm.bank3,
          bankAccNo1: this.CustomerContactDataForm.bankAccNo1,
          bankAccNo2: this.CustomerContactDataForm.bankAccNo2,
          bankAccNo3: this.CustomerContactDataForm.bankAccNo3,
          remark1: this.CustomerContactDataForm.remark1,
          remark2: this.CustomerContactDataForm.remark2,
          isprimary : this.CustomerContactDataForm.isprimary
        });
        this.ReadonlyCode = true
    }
  }
}
