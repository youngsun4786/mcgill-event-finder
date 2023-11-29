import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { MainComponent } from './views/main/main.component';
import { DisplayPostComponent } from './components/display-post/display-post.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'posts', component: DisplayPostComponent },
  { path: ' ', redirectTo: '/', pathMatch: 'full' },
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
