import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DefinitionService } from '../definition.service';

@Component({
  selector: 'app-vendor-contact',
  templateUrl: './vendor-contact.component.html',
  styleUrls: ['./vendor-contact.component.scss']
})
export class VendorContactComponent implements OnInit {
  VendotData: any;
  VendorContactDataForm:any;
  AddVendorContact_Response?: number;
  ReadonlyCode : boolean = false;



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<VendorContactComponent>,
    private definitionService: DefinitionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.VendorContactDataForm = this.data.vendorContactData;
    this.fillForm();
   }

   
  VendorContactForm = this.fb.group({
    vendContactId: [],
    vendorId: [],
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


  onSumbit(){
    this.VendorContactForm.get('vendorId')?.setValue(this.data.vendorId);
    if (this.VendorContactForm.value.vendorId) {
      this.definitionService.AddVendorContact(this.VendorContactForm.value).subscribe((res) => {
          if (res.status) {
            this.AddVendorContact_Response = res.id;
            this.closepopup();
          }
        });
    }
  }

  closepopup() {
    this.ref.close(this.AddVendorContact_Response);
  }

  fillForm(){
    if(this.VendorContactDataForm){
        this.VendorContactForm.setValue({
          vendContactId: this.VendorContactDataForm.vendContactId,
          vendorId: this.VendorContactDataForm.vendorId,
          contactCode: this.VendorContactDataForm.contactCode,
          contactName1: this.VendorContactDataForm.contactName1,
          contactName2: this.VendorContactDataForm.contactName2,
          contactPhone1: this.VendorContactDataForm.contactPhone1,
          contactPhone2: this.VendorContactDataForm.contactPhone2,
          contactPhone3: this.VendorContactDataForm.contactPhone3,
          contactPhone4: this.VendorContactDataForm.contactPhone4,
          contactPhone5: this.VendorContactDataForm.contactPhone5,
          contactAddress1: this.VendorContactDataForm.contactAddress1,
          contactAddress2: this.VendorContactDataForm.contactAddress2,
          contactAddress3: this.VendorContactDataForm.contactAddress3,
          contactEmail1: this.VendorContactDataForm.contactEmail1,
          contactEmail2: this.VendorContactDataForm.contactEmail2,
          contactEmail3: this.VendorContactDataForm.contactEmail3,
          idno: this.VendorContactDataForm.idno,
          passPortNo: this.VendorContactDataForm.passPortNo,
          bank1: this.VendorContactDataForm.bank1,
          bank2: this.VendorContactDataForm.bank2,
          bank3: this.VendorContactDataForm.bank3,
          bankAccNo1: this.VendorContactDataForm.bankAccNo1,
          bankAccNo2: this.VendorContactDataForm.bankAccNo2,
          bankAccNo3: this.VendorContactDataForm.bankAccNo3,
          remark1: this.VendorContactDataForm.remark1,
          remark2: this.VendorContactDataForm.remark2,
          isprimary : this.VendorContactDataForm.isprimary
        });
        this.ReadonlyCode = true
    }
  }

}
