import { HttpInterceptorFn } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

const handleToken = (router: Router) => {
  localStorage.clear();
  router.navigate(['/login']);
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({ withCredentials: true });
  const router = inject(Router);
  const token = localStorage.getItem('token') ?? '';

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const expired =
        decoded && decoded.exp ? decoded.exp < Date.now() / 1000 : false;
      if (expired) {
        alert('Token expired');
        console.error('Token expired');
        handleToken(router);
      }
    } catch (e: any) {
      alert('Invalid token');
      console.error('Invalid token');
      handleToken(router);
    }
  } else {
    alert('No token');
    console.error('No token');
    router.navigate(['/login']);
  }

  req = req.clone({
    setHeaders: { Authorization: token ? `Bearer ${token}` : '' },
  });

  return next(req);
};
