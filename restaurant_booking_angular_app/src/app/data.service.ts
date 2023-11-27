import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Data } from './data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiURL = "http://localhost:58271/api";
  
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  private selectedItem: any;

  setSelectedItem(item: any) {
    this.selectedItem = item;
  }

  getSelectedItem() {
    return this.selectedItem;
  }
  
  public sendGetRequest(){
    return this.httpClient.get(this.apiURL+'/items');
  }
  getAll(): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/items/')
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
  create(data:any): Observable<any> {
  
    return this.httpClient.post(this.apiURL + '/items/', JSON.stringify(data), this.httpOptions)
  
    
  }  
  find(id:number): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/items/' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(id:number, data:Data): Observable<any> {
  
    return this.httpClient.put(this.apiURL + '/items/' + id, JSON.stringify(data), this.httpOptions)
 
    .pipe( 
      catchError(this.errorHandler)
    )
  }
  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/items/' + id, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }


  public search = new BehaviorSubject<string>("");
  
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