// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class PostService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL = "http://localhost:58271/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  bookingDetails: any = {};
  constructor(private httpClient: HttpClient) { }


  

 

  setBookingDetails(details: any) {
    this.bookingDetails = details;
  }

  getBookingDetails() {
    return this.bookingDetails;
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/Bookings')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(post: Post): Observable<any> {
    return this.httpClient.post(this.apiURL + '/Bookings/', JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getBookingsByUserId(userId: number): Observable<Post[]> {
    const url = `${this.apiURL}/Bookings/ById/${userId}`;
    return this.httpClient.get<Post[]>(url);
  }

  find(id: number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/Bookings/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id: number, post: Post): Observable<any> {
    return this.httpClient.put(this.apiURL + '/Bookings/' + id, JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: number) {
    return this.httpClient.delete(this.apiURL + '/Bookings/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getPostByCId(cId: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.apiURL}/Bookings?cId=${cId}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
