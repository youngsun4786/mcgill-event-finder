import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models/post.models';
import { Observable } from 'rxjs';
import { httpOptions } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  isInitialized = false;

  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();

  URL = 'https://mcevent-backend.onrender.com';

  constructor(private http: HttpClient) {
    console.count('PostService:constructor');
  }

  initialize() {
    if (!this.isInitialized) {
      console.count('PostService:initialize');
      this.isInitialized = true;
      this.getPosts();
    }
  }

  getPosts() {
    console.count('PostService:getPosts');
    this.http
      .get<Post[]>(`${this.URL}/posts`, httpOptions)
      .subscribe((posts: Post[]) => {
        this.postsSubject.next(posts);
      });
  }

  getPostsForMain() {
    this.http
      .get<Post[]>('http://localhost:8000/posts-main', httpOptions)
      .subscribe((posts: Post[]) => {
        this.postsSubject.next(posts);
      });
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
