import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { CanDeactivateType } from '../models/canDeactivate.models';
import { AlertDialogComponent } from '../ui/dialog.component';
import { FormComponent } from '../ui/form.component';

@Component({
  standalone: true,
  imports: [FormComponent],
  template: `
    <section class="mx-auto	max-w-screen-sm">
      <div class="rounded-lg bg-white p-8 shadow-lg lg:p-12">
        <app-form />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent {
  public formComponent = viewChild(FormComponent);

  constructor(public dialog: Dialog) {}

  public canDeactivate(): CanDeactivateType {
    if (this.formComponent()?.form.dirty) {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        height: '400px',
        width: '600px',
      });
      const canDeactiveResponseSubject = new Subject<boolean>();
      dialogRef.closed.subscribe((result) =>
        canDeactiveResponseSubject.next(!!result),
      );
      return canDeactiveResponseSubject;
    } else {
      return true;
    }
  }
}
