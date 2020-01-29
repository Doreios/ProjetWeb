import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from './models/client';
import { LogInCredentials } from './models/logincredentials';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private CATALOGUEURL = "http://localhost/projet_angular/backend/catalogue";
  private LOGINURL = "http://localhost/projet_angular/backend/login";
  private SIGNUPURL = "http://localhost/projet_angular/backend/client";
  
  constructor(private httpClient: HttpClient) { }

  public getArticles(){
    return this.httpClient.get(this.CATALOGUEURL);
  }
  public logIn(logincredentials: string){
    return this.httpClient.post(this.LOGINURL, logincredentials);
  }
  public signUp(client: string){
    return this.httpClient.post(this.SIGNUPURL, client);
  }
}
