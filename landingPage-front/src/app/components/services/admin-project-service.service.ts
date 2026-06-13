import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminProjectServiceService {

  private url = 'https://landingpage-ezzw.onrender.com/api/project/';

  constructor(private http:HttpClient) { }

  getAdminProject(){
    return this.http.get(this.url + "list")
  }
}
