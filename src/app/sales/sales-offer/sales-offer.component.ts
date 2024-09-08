import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from 'src/app/definition/definition.service';

@Component({
  selector: 'app-sales-offer',
  templateUrl: './sales-offer.component.html',
  styleUrls: ['./sales-offer.component.scss']
})
export class SalesOfferComponent  implements OnInit {

  dataSource :any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  DisabledPrevButton: boolean = false;
  DisabledNextButton: boolean = false;
  firstRow: boolean = false;
  lastRow: boolean = false;
  DeleteDisable :boolean = true;
  SaveDisable : boolean = true;
  UpdateDisable : boolean = true;

  EditReadonly : boolean = false;
  reloadDisabled : boolean = false;
  UndoDisabled : boolean = true;
  undoIndex!: number;


  constructor(private definitionService: DefinitionService , private fb:FormBuilder,private dialog: MatDialog){
  }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.Table_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  }


  PurchaseOrderForm = this.fb.group({

  })

  
Table_DATA: any[] = [
  {position: 1, name: 'تحويل 1', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'تحويل 2', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'تحويل 3', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'تحويل 4', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'تحويل 5', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'تحويل 6', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'تحويل 7', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'تحويل 8', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'تحويل 9', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'تحويل 10', weight: 20.1797, symbol: 'Ne'},
];

  GetAllPurchaseOrder(){

  }

  onSumbit(){

  }

  updatePurchaseOrder(){

  }


  New(){

  }


  getLastRowData(){

  }

  getNextRowData(){

  }

  getPrevRowData(){

  }

  getFirstRowData(){

  }

  Open_delete_confirm(){

  }

  undo(){

  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  
  fillForm(row:any){

  }
}


