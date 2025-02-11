import { Component, Input, signal, effect } from '@angular/core';
import { imageCarouselAnimations } from './image-carousel.animations';
import {CommonModule, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'zh-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  animations: imageCarouselAnimations,
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
})
export class ImageCarouselComponent {
  @Input({ required: true }) imageUrls: string[] = [];

  @Input() next = signal<object | null>(null);
  @Input() previous = signal<object | null>(null);

  // Signal for the current index
  currentIndex = signal(0);

  // Signal for the current image URL, derived from currentIndex and imageUrls
  currentImageUrl = signal('');

  // Track if animation is currently running to prevent rapid clicks
  animationInProgress = signal(false);

  constructor() {
    effect(() => {
      if (this.imageUrls && this.imageUrls.length > 0) {
        this.currentImageUrl.set(this.imageUrls[this.currentIndex()]);
      }
    });

    effect(() => {
      if (this.next()) {
        this.nextImage();
        this.next.set(null); // Reset the signal after processing
      }
    });

    // Effect to handle previous signal
    effect(() => {
      if (this.previous()) {
        this.previousImage();
        this.previous.set(null); // Reset the signal after processing
      }
    });
  }

  nextImage(): void {
    if (this.animationInProgress()) return; // Prevent action during animation
    if (this.imageUrls && this.imageUrls.length > 0) {
      let nextIndex = this.currentIndex() + 1;
      if (nextIndex >= this.imageUrls.length) {
        nextIndex = 0; // Loop back to the start
      }
      this.currentIndex.set(nextIndex);
    }
  }

  previousImage(): void {
    if (this.animationInProgress()) return; // Prevent action during animation
    if (this.imageUrls && this.imageUrls.length > 0) {
      let prevIndex = this.currentIndex() - 1;
      if (prevIndex < 0) {
        prevIndex = this.imageUrls.length - 1; // Loop to the end
      }
      this.currentIndex.set(prevIndex);
    }
  }

  onAnimationStart(): void {
    this.animationInProgress.set(true);
  }

  onAnimationDone(): void {
    this.animationInProgress.set(false);
  }

  onImageLoad(): void {
    // Optional: Handle image load event if needed
    // console.log('Image loaded');
  }

  onImageError(): void {
    // Optional: Handle image error event, maybe display a placeholder image
    console.error('Error loading image:', this.currentImageUrl());
    // Optionally set a placeholder image URL:
    // this.currentImageUrl.set('/path/to/placeholder.png');
  }
}
