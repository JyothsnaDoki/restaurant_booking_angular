import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
     
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = "http://localhost:58271/api";
  private baseUrl="http://localhost:58271/api/Registrations";

    
  /*------------------------------------------
  --------------------------------------------
  Http Header Options
  --------------------------------------------
  --------------------------------------------*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  /*sendGetRequest: any;*/


 
   
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(private httpClient: HttpClient) { }
  
    
  public sendGetRequest(){
    return this.httpClient.get(this.apiURL+'/Registrations');
  }
  /**
   * Write code on Method
   *
   * @return response()
   */
  getAll(): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/Registrations/')
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  getUserById(userId: number): Observable<User> {
    const url = `${this.baseUrl}/${userId}`;
    return this.httpClient.get<User>(url);
  }
  /**
   * Write code on Method
   *
   * @return response()
   */
  create(user:User): Observable<any> {
  
    return this.httpClient.post(this.apiURL + '/Registrations/', JSON.stringify(user), this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  find(id:number): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/Registrations/' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  update(id:number, user:User): Observable<any> {
  
    return this.httpClient.put(this.apiURL + '/Registrations/' + id, JSON.stringify(user), this.httpOptions)
 
    .pipe( 
      catchError(this.errorHandler)
    )
  }
       
  /**
   * Write code on Method
   *
   * @return response()
   */
  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/Registrations/' + id, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
      
  checkDuplicateUser(email: string): Observable<any> {
    const url = `${this.apiURL}/Registrations/checkDuplicateUser?email=${email}`;
    return this.httpClient.get(url);
  }
  /** 
   * Write code on Method
   *
   * @return response()
   */
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
