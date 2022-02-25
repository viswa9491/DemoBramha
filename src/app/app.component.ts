import { Component } from '@angular/core';
import { DataService } from './data.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  id: any;
  name: string;
  city: string;
  country: string;
  brewerytype: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  displayedColumns: string[] = ['id', 'name', 'city', 'country', 'brewerytype'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  breweriesData: any;
  showTable: boolean = false;
  constructor(private _dataSVC : DataService){}
  title = 'BrahmaDemo';

  getDetails(){
    this._dataSVC.getListBreweries().subscribe((res:any)=>{
      console.log(res);
      //this.breweriesData = res;
      this.showTable = true;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }


//  method to filter  city information
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
   // this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this._dataSVC.getFilteredValues(filterValue).subscribe((res:any)=>{
      this.dataSource = new MatTableDataSource(res);
    })
  }
}
