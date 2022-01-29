import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // apiUrl = 'http://localhost:8080/api/v1'
    apiUrl = 'https://obscure-meadow-55377.herokuapp.com/api/v1'

    constructor(private http: HttpClient) {}

    registerUser(data: Object): Observable<Object> {
        const body = data
        return this.http.post(`${this.apiUrl}/user/register`, body)
    }

    loginUser(data: Object): Observable<Object> {
        const body = data
        return this.http.post(`${this.apiUrl}/user/login`, body)
    }
}
