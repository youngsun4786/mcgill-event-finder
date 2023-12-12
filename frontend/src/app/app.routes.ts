import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { MainComponent } from './views/main/main.component';
import { PostComponent } from './views/post/post.component';
import { authGuard } from './utils/guard/auth.guard';
import { DisplayPostComponent } from './views/post/components/display-post/display-post.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'posts', component: PostComponent, canActivate: [authGuard] },
  {
    path: 'my-posts',
    component: PostComponent,
    canActivate: [authGuard],
  },
  {
    path: 'pinned-posts',
    component: PostComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // relativeLinkResolution: "legacy"
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
