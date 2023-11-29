import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { httpInterceptorProviders } from './utils/HttpRequestInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    httpInterceptorProviders,
    provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideClientHydration(),
  ],
};
