import { Injectable } from '@angular/core';
import { Person } from './person';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PeopleService {
    private readonly ServiceUrl: string = "https://localhost:5001/api/people";

    constructor(private http: HttpClient) {
    }

    getPeople(): Observable<Person[]> {
        return this.http.get<Person[]>(this.ServiceUrl);
    }

    addPerson(name: string){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
        return this.http.post(this.ServiceUrl, `"${name}"`, httpOptions);
    }
}