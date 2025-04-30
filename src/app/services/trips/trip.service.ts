import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiUrl ;


@Injectable({
  providedIn: 'root'
})
export class TripService {
  constructor( private httpClient:HttpClient) { }

  getAllTrips() {
    return this.httpClient.get<any[]>(BASE_URL + "trips");
  }


  saveTrip(tripData: any, files: File[]): Observable<any> {
    const formData = new FormData();

    // Append all trip data
    for (const key in tripData) {
      if (tripData.hasOwnProperty(key) && tripData[key] !== null && tripData[key] !== '') {
        formData.append(key, tripData[key].toString());
      }
    }

    // Append files
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append('files', file, file.name);
      });
    }

  

    return this.httpClient.post<any>(`${BASE_URL}trips`, formData);
  }
}

