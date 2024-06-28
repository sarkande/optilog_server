import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Log } from '../interfaces/log';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private logsUrl = 'http://0.0.0.0:5050/logs'; // Remplacez par l'URL de votre API
  private logsSubject = new BehaviorSubject<Log[]>([]);
  logs$ = this.logsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(this.logsUrl).pipe(
      tap((logs) => this.logsSubject.next(logs)),
      catchError(this.handleError)
    );
  }

  clearLogs(): Observable<void> {
    return this.http.delete<void>(this.logsUrl).pipe(
      tap(() => this.logsSubject.next([])),
      catchError(this.handleError)
    );
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // Log to console
    return throwError(error); // Retourner une observable d'erreur
  }
}
