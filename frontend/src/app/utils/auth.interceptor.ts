import { HttpInterceptorFn } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const handleToken = (router: Router, platformId: Object) => {
  if (isPlatformBrowser(platformId)) {
    localStorage.clear();
    router.navigateByUrl('/login');
  }
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({ withCredentials: true });
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  let token: string | null = '';
  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token') ?? '';
  }

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const expired =
        decoded && decoded.exp ? decoded.exp < Date.now() / 1000 : false;
      if (expired) {
        // alert('Token expired');
        console.error('Token expired');
        handleToken(router, platformId);
      }
    } catch (e: any) {
      // alert('Invalid token');
      console.error('Invalid token');
      handleToken(router, platformId);
    }
  } else {
    // alert('No token');
    console.error('No token');
    handleToken(router, platformId);
  }

  req = req.clone({
    setHeaders: { Authorization: token ? `Bearer ${token}` : '' },
  });

  return next(req);
};
