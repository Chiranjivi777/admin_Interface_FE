import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flat } from './flat';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class FlatService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getFlatDetails(): Observable<Flat[]> {
    return this.http.get<Flat[]>(`${this.apiServerUrl}/flat/all`);
  }

  public addFlatDetails(flat: Flat): Observable<Flat> {
    return this.http.post<Flat>(`${this.apiServerUrl}/flat/add`, flat);
  }

  public updateFlatDetails(flat: Flat): Observable<Flat> {
    return this.http.put<Flat>(`${this.apiServerUrl}/flat/update`, flat);
  }

  public deleteFlatDetails(flatId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/flat/delete/${flatId}`);
  }
}
