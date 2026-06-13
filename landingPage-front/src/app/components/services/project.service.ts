import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url = 'https://landingpage-ezzw.onrender.com/api/project/';
  
  constructor(private http: HttpClient) { }

  getProject(){
    //  variable dinámica:
    return this.http.get(this.url + 'list'); 
  }
}

