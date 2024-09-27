import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Media } from '../../models/app.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<Media[]>(`${environment.apiUrl}/movies`);
  }
}
