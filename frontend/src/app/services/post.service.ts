import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {} from 'rxjs';
import { Post } from '../models/post.models';
import { Observable } from 'rxjs';
import { httpOptions } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  URL = 'http://localhost:8000';
  emailFilter = false;
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.URL}/posts`, httpOptions);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.URL}/posts`, post, httpOptions);
  }

  deletePostById(id: string): Observable<Post> {
    return this.http.delete<Post>(`${this.URL}/posts/${id}`, httpOptions);
  }

  updatePostById(id: string, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.URL}/posts/${id}`, post, httpOptions);
  }
}
