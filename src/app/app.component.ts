import { Component, ViewChild } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from './models/model/Employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;  

  nav = (window.navigator as any);

  displayedColumns = ['dni', 'salary', 'color'];

  // dataSource = new MatTableDataSource<Employee>(this.listEmployee);
  dataSource = new MatTableDataSource<Employee>();

  constructor(private employeeService : EmployeeService){}
  
  
  ngOnInit(){
    this.employeeService.GetEmployees().subscribe(data => {
      this.dataSource = new MatTableDataSource<Employee>(data)
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.paginator);
  }

  typeEmployee(type: number){
    let color = "";
    switch(type){
      case 0 : color = "#6FE592"; break;
      case 1 : color = "#AD7AE8"; break;
      case 2 : color = "#D1DC87"; break;
      default :  color = "#FFFFFF"; break;
    }
    return color;
  }

  downloadButtonPush() {
    var csvData = this.ConvertToCSV(this.dataSource.data);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
  
    if(this.nav.msSaveOrOpenBlob) {
      this.nav.msSaveBlob(blob, 'Empleados.csv');
    } else {
      var a = document.createElement("a");
      a.href = url;
      a.download = 'Empleados.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }

  ConvertToCSV(objArray: any): string {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";

    for (var index in objArray[0]) {
        row += index + ';';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ';'

            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
}
}
