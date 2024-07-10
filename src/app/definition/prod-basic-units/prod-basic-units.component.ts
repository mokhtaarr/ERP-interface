import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DefinitionService } from '../definition.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-prod-basic-units',
  templateUrl: './prod-basic-units.component.html',
  styleUrls: ['./prod-basic-units.component.scss']
})
export class ProdBasicUnitsComponent implements OnInit {
  displayedColumns: string[] = ['unitCode','unitNam','unitNameE','unittRate','remarks'];
  dataSource:any
  AllProdBasicsUnit : any[] = [];
  ProdBasicUnit_Response : any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ProdBasicUnitsComponent>,
    private definitionService: DefinitionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.GetAllProdBasicUnits();
  }

  GetAllProdBasicUnits(){
    this.definitionService.getAllProdBasicUnits().subscribe(res=>{
      this.AllProdBasicsUnit = res; 
      this.dataSource = new MatTableDataSource<any>(this.AllProdBasicsUnit);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  fillForm(row:any){
   if(row){
   this.ProdBasicUnit_Response = row;
   this.closepopup();
   }
  }

  closepopup() {
    this.ref.close(this.ProdBasicUnit_Response);
  }

}
