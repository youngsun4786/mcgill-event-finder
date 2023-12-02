import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const isClient = isPlatformBrowser(inject(PLATFORM_ID));
  const storageService = inject(StorageService);
  const router = inject(Router);

  if (isClient) {
    if (storageService.loggedIn()) return true;
  }

  if (isClient) {
    alert('You must be logged in to view this page');
    // not logged in so redirect to login page with the return url
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  }
  return false;
};
