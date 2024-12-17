import { inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CanMatchFn } from '@angular/router';

export const localhostGuard: CanMatchFn = (route, state) => {
  const document = inject(DOCUMENT);
  console.warn(document.location.hostname)
  return document.location.hostname === 'localhost' || document.location.hostname === '127.0.0.1';
};
