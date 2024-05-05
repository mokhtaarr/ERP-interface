import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from '../definition.service';

@Component({
  selector: 'app-item-categories',
  templateUrl: './item-categories.component.html',
  styleUrls: ['./item-categories.component.scss']
})
export class ItemCategoriesComponent implements OnInit{

  dataSource: any;
  displayedColumns: string[] = ['itemCategoryId', 'itemCatCode','itemCatDescA', 'itemCatDescE','Name_parentItemCategoryId','parentItemCategoryId','itemCategoryType'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  AllItemCategory : any[] = [];

   ELEMENT_DATA: any[] = [
    {code: 1, name: 'Aydrogen', weight: 1.0079, symbol: 'H'},
    {code: 2, name: 'belium', weight: 4.0026, symbol: 'He'},
    {code: 3, name: 'cithium', weight: 6.941, symbol: 'Li'},
    {code: 4, name: 'deryllium', weight: 9.0122, symbol: 'Be'},
    {code: 5, name: 'eoron', weight: 10.811, symbol: 'B'},
    {code: 6, name: 'farbon', weight: 12.0107, symbol: 'C'},
    {code: 7, name: 'gitrogen', weight: 14.0067, symbol: 'N'},
    {code: 8, name: 'hxygen', weight: 15.9994, symbol: 'O'},
    {code: 9, name: 'rluorine', weight: 18.9984, symbol: 'F'},
    {code: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {code: 11, name: 'momo', weight: 20.1797, symbol: 'Ne'},
  ];

  constructor(private definitionService: DefinitionService){

  }

  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    this.getAllItemCategory();
  }


  getAllItemCategory(){
    this.definitionService.GetAllItemCategory().subscribe(res=>{
      this.AllItemCategory = res;
      this.dataSource = new MatTableDataSource<any>(this.AllItemCategory);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  fillForm(row:any){
    console.log(row)
  }


  
 
}

