import { Injectable } from '@angular/core';
import { Person } from './person';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class PeopleService {
  private readonly ServiceUrl: string = "https://localhost:5001/api/people";

  constructor(private http: HttpClient) {
  }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.ServiceUrl);
  }

  addPerson(name: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.ServiceUrl, `"${name}"`, httpOptions);
  }

  removePerson(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.delete(this.ServiceUrl + "/" + id, httpOptions).pipe(switchMap(r => {
      if (r) return of(id);
      return of(null);
    }));
  }
}