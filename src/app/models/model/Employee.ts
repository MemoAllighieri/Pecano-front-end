import { IEmployee } from "../Interface/IEmployee";

export class Employee implements IEmployee{
    dni: string;
    salary: number;
    type: number;
    constructor(){
        this.dni = "";
        this.salary = 0.0;
        this.type = 0;
    }
}