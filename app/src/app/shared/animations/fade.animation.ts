import { animate, group, query as q, style, transition, trigger } from '@angular/animations';

export function query(s, a, o = { optional: true }) {
  return q(s, a, o);
}

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    group([
      query(':enter',
        [
          style({ opacity: 0 }),
          animate('.1s', style({ opacity: 1 })),
        ],
      ),
      query(':leave',
        [
          style({ opacity: 1, position: 'absolute', width: '100%', top: '60px' }),
          animate('.1s', style({ opacity: 0 })),
        ],
      ),
    ]),
  ]),
]);
