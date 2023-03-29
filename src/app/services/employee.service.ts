import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from '../models/Interface/IEmployee';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService{
    constructor(private http: HttpClient){}
    public GetEmployees() : Observable<IEmployee[]>{
        return this.http.get<IEmployee[]>("https://localhost:7111/api/Employee/GetEmployees");
    }
}