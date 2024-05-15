import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { interval, takeWhile } from 'rxjs';

@Component({
  standalone: true,
  imports: [DecimalPipe],
  selector: 'app-root',
  template: `
    <main class="flex h-screen items-center justify-center">
      <div
        class="flex w-full max-w-screen-sm flex-col items-center gap-y-8 p-4">
        <button
          class="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors ease-in-out hover:bg-indigo-700"
          (mousedown)="onSend()"
          (mouseup)="handleStopTimer('mouseup')"
          (mouseleave)="handleStopTimer('mouseleave')">
          Hold me
        </button>

        <progress [(value)]="percent" [max]="100"></progress>

        <div>
          Remaining time:
          {{
            (holdButtonTimer - intervalDurationComputed | number) +
              (holdButtonTimer - intervalDurationComputed >= 1000
                ? ' s.'
                : ' ms.')
          }}
        </div>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public percent = 0;
  public intervalDuration = 50;
  public holdButtonTimer = 5000;
  public intervalDurationComputed = 0;

  public continueTimer = true;
  public timerDurationsList = [
    1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
  ];

  public cd = inject(ChangeDetectorRef);

  onSend() {
    this.handleStopTimer();
    this.continueTimer = true;
    interval(this.intervalDuration)
      .pipe(takeWhile(() => this.continueTimer))
      .subscribe(() => {
        this.intervalDurationComputed += this.intervalDuration;
        this.percent =
          (this.intervalDurationComputed / this.holdButtonTimer) * 100;
        if (this.percent === 100) {
          console.log('Delay is reached, call backend !');
          this.continueTimer = false;
        }
        this.detectChanges();
      });
  }

  handleStopTimer(typeOfMouseExit?: 'mouseleave' | 'mouseup') {
    this.percent = 0;
    this.intervalDurationComputed = 0;
    this.continueTimer = false;
    switch (typeOfMouseExit) {
      case 'mouseleave':
        console.warn('Your mouse cursor went out of the hold button');
        break;
      case 'mouseup':
        console.warn('You stopped holding the hold button');
        break;
      default:
        break;
    }
    this.detectChanges();
  }

  public detectChanges() {
    this.cd.detectChanges();
  }
}
