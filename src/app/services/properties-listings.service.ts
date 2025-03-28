import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const BASE_URL = environment.apiUrl ;

@Injectable({
  providedIn: 'root'
})
export class PropertiesListingsService {




  constructor( private httpClient:HttpClient) { }

  getAllListings() {
    return this.httpClient.get<any[]>(BASE_URL + "properties");
  }

  getPropertyById(id:string)
  {
    return this.httpClient.get<any>(`${BASE_URL}properties/${id}`);
  }

  deletePropertyById(id:string)
  {
    return this.httpClient.delete(`${BASE_URL}properties/${id}`);
  }


  getFavoriteListings() {
    return this.httpClient.get<any[]>(BASE_URL + "listings").pipe(
      map((listings:any) => listings.filter((listing:any) => listing.favorite === "true"))
    );
  }

  getAllBookings() {
    return this.httpClient.get<any[]>(BASE_URL + "bookings");
  }
  getAllReservations() {
    return this.httpClient.get<any[]>(BASE_URL + "reservations");
  }


  saveListing(listingData: any) {
    return this.httpClient.post<any>(BASE_URL + "listings", listingData);
  }

  searchProperties(searchParams: any): Observable<any[]> {
    const body = {
      streetAddress: searchParams.streetAddress || '',
      adult: parseInt(searchParams.adults, 10) || 0, 
      children: parseInt(searchParams.children, 10) || 0,
      rooms: parseInt(searchParams.rooms, 10) || 0,
      havePets: searchParams.pets === 'true' || searchParams.pets === true,
      checkInDate: searchParams.startDate || '',
      checkOutDate: searchParams.endDate || ''
    };

    return this.httpClient.post<any[]>(`${BASE_URL}properties/search`, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }



}
