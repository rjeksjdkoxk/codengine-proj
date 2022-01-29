import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Department } from '../models/department.model'

@Injectable({
    providedIn: 'root',
})
export class DepartmentService {
    // apiUrl = 'http://localhost:8080/api/v1'
    apiUrl = 'https://obscure-meadow-55377.herokuapp.com/api/v1'

    constructor(private http: HttpClient) {}

    getAllDepartment(): Observable<Department[]> {
        return this.http.get<Department[]>(`${this.apiUrl}/departments/all`)
    }

    getSingleDepartment(dep_id: string): Observable<Department> {
        return this.http.get<Department>(`${this.apiUrl}/departments/${dep_id}`)
    }
}
