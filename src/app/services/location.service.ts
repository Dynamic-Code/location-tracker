import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'https://localhost:7167/api/Location/updateLocation';

  constructor(private http: HttpClient) {}

  sendLocation(latitude: number, longitude: number) {
    const locationData = { latitude, longitude };
    return this.http.post(this.apiUrl, locationData).subscribe({
      next: () => console.log('Location sent:', locationData),
      error: (err) => console.error('Error sending location:', err),
    });
  }
}
