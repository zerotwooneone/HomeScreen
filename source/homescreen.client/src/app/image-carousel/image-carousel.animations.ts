import { trigger, transition, style, animate } from '@angular/animations';

export const carouselAnimation = trigger('carouselAnimation', [
  transition('* <=> *', [
    style({ opacity: 0 }),
    animate('500ms ease-in-out', style({ opacity: 1 }))
  ])
]);

export const imageCarouselAnimations = [carouselAnimation]; // Export as an array if you might have more animations later
