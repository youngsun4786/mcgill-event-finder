import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.models';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  URL = 'http://localhost:8000';
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    const url = `${this.URL}/posts`;
    return this.http.get<Post[]>(url);
  }
}
