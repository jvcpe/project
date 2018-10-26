import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ITopic } from '../_models/topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private http: HttpClient){}

  getTopics(): Observable<ITopic[]> {
    return this.http.get<ITopic[]>(`${config.apiUrl}/topics/getAll`).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  createTopic(topicName: string, message: string, userName: string) {
      return this.http.post<any>(`${config.apiUrl}/topics/createTopic`, {
        topicName: topicName,
        message: message,
        userName: userName,
      }).pipe(
        catchError(this.handleError)
      );
  }

  getTopic(topicName: string): Observable<ITopic> {
    let topicNameSafe = topicName.replace("?", "%3F");
    return this.http.get<ITopic>(`${config.apiUrl}/topics/${topicNameSafe}`).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  createMessage(topicName: string, message: string, userName: string) {
      return this.http.post<any>(`${config.apiUrl}/topics/createMessage`, {
        topicName: topicName,
        message: message,
        userName: userName,
      }).pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
