import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { httpInterceptorProviders } from './utils/HttpRequestInterceptor';
import { authInterceptor, loggerInterceptor } from './utils';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor, loggerInterceptor])),
    httpInterceptorProviders,
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideClientHydration(),
  ],
};
