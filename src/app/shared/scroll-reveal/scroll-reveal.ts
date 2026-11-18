import { afterNextRender, DestroyRef, Directive, ElementRef, inject, signal } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  host: {
    style: 'display: block',
    '[class.scroll-reveal]': 'visible()',
  },
})
export class ScrollReveal {
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly visible = signal(false);

  constructor() {
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            this.visible.set(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 },
      );

      observer.observe(this.element.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
