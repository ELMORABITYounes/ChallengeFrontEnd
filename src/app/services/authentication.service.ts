import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private HOST:String="http://localhost:8080";
  private jwtToken=null;
  private roles:Array<any>=[];
  constructor(private http:HttpClient) { }

  checkUsername(value):Observable<boolean>{
    return this.http.get<boolean>(this.HOST+"/checkUsername?value="+value)
  }

  login(user) {
    return this.http.post(this.HOST+"/login",user,{observe:"response"});
  }

  saveToken(jwt:string){
    localStorage.setItem("token" ,jwt)
    this.jwtToken=jwt;
    let jwtHelper=new JwtHelperService();
    this.roles=jwtHelper.decodeToken(jwt).roles;
  }

  isUser(){
    if (!this.isAuthenticated()){
      return false
    }
    for(let r of this.roles){
      if(r.authority==="USER") return true;
    }
    return false;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token==null)
      return false
    // Check whether the token is expired and return
    // true or false
    let jwtHelper=new JwtHelperService();

    return !jwtHelper.isTokenExpired(token);
  }

  logout(){
    localStorage.removeItem("token")
    this.jwtToken=null;
    this.roles=[];
  }

  register(regiterForm){
    return this.http.post(this.HOST+"/register",regiterForm);
  }
}
