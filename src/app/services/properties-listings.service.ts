import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

}
