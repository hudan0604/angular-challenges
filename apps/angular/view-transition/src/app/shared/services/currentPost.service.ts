import { Injectable, signal } from '@angular/core';
import { IMAGE_URL_MAP } from '../enums/images.enums';

@Injectable({ providedIn: 'root' })
export class CurrentPostService {
  readonly currentId = signal<string | null>(null);

  public returnViewTransition(
    currentId: string,
    type: keyof typeof IMAGE_URL_MAP,
  ): string {
    return this.currentId() === currentId ? IMAGE_URL_MAP[type] : '';
  }
}
