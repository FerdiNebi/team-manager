import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Feedback } from './feedback';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FeedbackService {
        private readonly ServiceUrl: string = environment.feedbackServiceUrl;
    
    constructor(private http: HttpClient) {
    }
  
    getFeedbackItems(personId: string) : Observable<Feedback[]> {
        return this.http.get<Feedback[]>(this.ServiceUrl + `?personId=${personId}`);
    }

    addFeedback(feedback: Feedback): Observable<Feedback> {
        return this.http.post<Feedback>(this.ServiceUrl, feedback);
    }

    addBatchFeedback(batchFeedback: Feedback[]): Observable<any> {
        return this.http.post<any>(this.ServiceUrl + "/batchCreate", batchFeedback);
    }
}