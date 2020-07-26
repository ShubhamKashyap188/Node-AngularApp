import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import * as globalVariable from './../globel';

@Injectable()
export class PostService {
  authToken: any;
  user: any;
  constructor(private http: Http) {
    const token = localStorage.getItem("id_token");
    this.user = localStorage.getItem("user");
    this.authToken = token;
  }
  // add post
  public addPost(data) {
    const headers = new Headers();
    data.user_id = JSON.parse(this.user)._id;
    headers.append("x-access-token", this.authToken);
    headers.append("Content-Type", "application/json");
    return this.http
      .post(globalVariable.url + "posts", data, { headers: headers })
      .map((response: Response) => {
        let post = response.json();
        return post;
      });
  }
  // get post
  public getPost() {
    const headers = new Headers();
    headers.append("x-access-token", this.authToken);
    headers.append("Content-Type", "application/json");
    return this.http
      .get(globalVariable.url + "all-posts", { headers: headers })
      .map((response: Response) => {
        let post = response.json();
        return post;
      });
  }
  // get user post
  public getUserPost() {
    const headers = new Headers();
    headers.append("x-access-token", this.authToken);
    headers.append("Content-Type", "application/json");
    return this.http
      .get(globalVariable.url + "posts/user-posts/"+JSON.parse(this.user)._id, { headers: headers })
      .map((response: Response) => {
        let post = response.json();
        return post;
      });
  }
  // get post by id
  public getPostById(id) {
    const headers = new Headers();
    headers.append("x-access-token", this.authToken);
    headers.append("Content-Type", "application/json");
    return this.http
      .get(globalVariable.url + "posts/" + id, { headers: headers })
      .map((response: Response) => {
        let post = response.json();
        return post;
      });
  }
  // add post
  public editPost(data) {
    const headers = new Headers();
    headers.append("x-access-token", this.authToken);
    headers.append("Content-Type", "application/json");
    return this.http
      .put(globalVariable.url + "posts/"+data._id, data, { headers: headers })
      .map((response: Response) => {
        let post = response.json();
        return post;
      });
  }
  // delete post
  public deletePost(id) {
    const headers = new Headers();
    headers.append("x-access-token", this.authToken);
    headers.append("Content-Type", "application/json");
    return this.http
      .delete(globalVariable.url + "posts/" + id, { headers: headers })
      .map((response: Response) => {
        let post = response.json();
        return post;
      });
  }
}
