import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models/post.models';
import { Observable } from 'rxjs';
import { httpOptions } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class PostService implements OnInit {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();

  URL = 'http://localhost:8000';
  emailFilter = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.refreshPosts();
  }

  private refreshPosts() {
    this.http
      .get<Post[]>(`${this.URL}/posts`, httpOptions)
      .subscribe((posts: Post[]) => {
        this.postsSubject.next(posts);
      });
  }

  getPosts(): Observable<Post[]> {
    this.refreshPosts();
    return this.posts$;
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
