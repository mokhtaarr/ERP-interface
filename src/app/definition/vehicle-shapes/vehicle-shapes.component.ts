import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-vehicle-shapes',
  templateUrl: './vehicle-shapes.component.html',
  styleUrls: ['./vehicle-shapes.component.scss']
})
export class VehicleShapesComponent implements OnInit ,AfterViewInit {

  dataSource: any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

   ELEMENT_DATA: any[] = [
    {position: 1, name: 'Aydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'belium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'cithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'deryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'eoron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'farbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'gitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'hxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'rluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {position: 11, name: 'momo', weight: 20.1797, symbol: 'Ne'},
  ];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }


  
 
}
