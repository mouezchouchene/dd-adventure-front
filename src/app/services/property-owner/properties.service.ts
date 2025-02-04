import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const BASE_URL = environment.apiUrl ;

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  

  constructor( private httpClient:HttpClient) { }

  getAllProperties() {
    return this.httpClient.get<any[]>(BASE_URL + "properties");
  }

  getPropertyById(id:string)
  {
    return this.httpClient.get<any>(`${BASE_URL}properties/${id}`);
  }

  saveProperty(listingData: any, images: File[]) {
    const formData = new FormData();
  
    // Append all properties to the FormData object
    for (const key in listingData) {
      if (listingData.hasOwnProperty(key)) {
        formData.append(key, listingData[key]);
      }
    }
  
    // Append images to the FormData object
    if (images && images.length > 0) {
      images.forEach((image, index) => {
        formData.append('images', image, image.name);
      });
    } 
  
    return this.httpClient.post<any>(BASE_URL + "properties", formData);
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



}
