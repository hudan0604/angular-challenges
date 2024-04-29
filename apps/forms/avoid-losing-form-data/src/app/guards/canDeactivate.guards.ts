import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from '../models/canDeactivate.models';

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component: CanComponentDeactivate,
) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
