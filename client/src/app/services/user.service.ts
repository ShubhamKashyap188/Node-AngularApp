import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import * as globalVariable from './../globel';

@Injectable()
export class UserService {

    authToken: any;
    constructor(private http: Http) { }
    // login
    public userLogin(data){
        return this.http.post(globalVariable.url+'login', data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    // signup
    public addUser(data){
        return this.http.post(globalVariable.url+'signup',data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    // forgot
    public userForgetPassword(data){
        return this.http.post(globalVariable.url+'forget-password', data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    // get user
    public user(id){
        /*let user = JSON.parse(localStorage.getItem('currentuser'))
        let headers = new Headers();
        headers.append('x-access-token', user['custoken']);, {headers: headers}*/
        return this.http.get(globalVariable.url+'users/'+id)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    // update user
    public userUpdate(data){
        /*let user = JSON.parse(localStorage.getItem('currentuser'))
        let headers = new Headers();
        headers.append('x-access-token', user['custoken']);, {headers: headers}*/
        return this.http.put(globalVariable.url+'users/'+data._id,data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    // delete password
    public userDelete(id){
        /*let user = JSON.parse(localStorage.getItem('currentuser'))
        let headers = new Headers();
        headers.append('x-access-token', user['custoken']);, {headers: headers}*/
        return this.http.delete(globalVariable.url+'users/'+id)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    // change password
    public userChangePassword(data){
        return this.http.put(globalVariable.url+'change-password/'+data._id,data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    // store user
    public storeUserData(token, user){
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }
    // load token
    public loadToken(){
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }
    // check login
    public loggedIn(){
        return tokenNotExpired('id_token');
    }
    // logout
    public logout(){
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }
    
}
