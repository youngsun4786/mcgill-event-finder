import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { MainComponent } from './views/main/main.component';


export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },

];
