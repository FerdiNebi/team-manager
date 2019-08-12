import { Injectable } from '@angular/core';
import { Person } from './person';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PeopleService {
    private readonly ServiceUrl: string = "https://localhost:5001/api/people";

    constructor(private http: HttpClient) {
    }

    getPeople(): Observable<Person[]> {
        return this.http.get<Person[]>(this.ServiceUrl);
    }
}