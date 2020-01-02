import { Directive, ElementRef, OnChanges, SimpleChanges, Input, HostBinding } from '@angular/core';
import { timeout, first } from 'rxjs/operators';
import { of, interval } from 'rxjs';

@Directive({
    selector: '[scrollToBottom]',
})
export class ScrollToBottomDirective implements OnChanges {
    @Input('scrollToBottom') isVisible: boolean;

    constructor(private element: ElementRef) {
        this.element.nativeElement.scrollTop = this.element.nativeElement.scrollHeight;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.isVisible && changes.isVisible.currentValue) {
            interval(10).pipe(first()).subscribe(() => {
                this.element.nativeElement.scrollTop = this.element.nativeElement.scrollHeight;
            });
        }
    }
}