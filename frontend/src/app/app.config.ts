import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideClientHydration(),
  ],
};
