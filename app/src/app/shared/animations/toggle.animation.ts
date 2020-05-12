import { animate, state, style, transition, trigger } from '@angular/animations';

export const toggleAnimation = trigger('open', [
  state('open', style({
    height: '*',
  })),
  state('close', style({
    height: '0',
  })),
  transition('open => close', animate('.3s ease-in')),
  transition('close => open', animate('.3s ease-out')),
]);


export const toggleAnimationQuick = trigger('open', [
  state('open', style({
    height: '*',
  })),
  state('close', style({
    height: '0',
  })),
  transition('open => close', animate('.1s ease-in')),
  transition('close => open', animate('.1s ease-out')),
]);

export const toggleAnimationParametric =
  trigger('open', [
    state('open', style({
      height: '*',
    })),
    state('close', style({
      height: '0',
    })),
    transition('open => close', animate('{{ time }} ease-in')),
    transition('close => open', animate('{{ time }} ease-out')),
  ]);
