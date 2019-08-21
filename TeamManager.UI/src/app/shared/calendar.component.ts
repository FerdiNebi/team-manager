import { Component, OnInit, ViewChild, TemplateRef, ElementRef, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { Subscription, fromEvent } from 'rxjs';
import { TemplatePortal } from '@angular/cdk/portal';
import { filter, take } from 'rxjs/operators';
import { Person } from '../people/person';

declare var $: any;

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
    overlayRef: OverlayRef | null;
    private subscription: Subscription;
    @Input() person: Person;
    @Input() contextMenuActions: string[];
    @Output() dayRendered = new EventEmitter<any>();
    @Output() contextMenuActionClicked: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('contextMenu', { static: true }) contextMenu: TemplateRef<any>;
    @ViewChild('calendar', { static: true }) calendarElement: ElementRef;

    constructor(public overlay: Overlay,
        public viewContainerRef: ViewContainerRef) { }

    ngOnInit(): void {
        const that = this;
        $(this.calendarElement.nativeElement).calendar({
            maxDate: new Date(),
            enableContextMenu: true,
            style: "background",
            customDayRenderer: function (element, date) {
                if (that.dayRendered) {
                    that.dayRendered.emit({element, date});
                }
            },
            dayContextMenu: function (e) {
                that.close();
                var el = new ElementRef(e.element[0]);
                const positionStrategy = that.overlay.position()
                    .flexibleConnectedTo(el)
                    .withPush(false)
                    .withPositions([{
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'top'
                    }]);

                that.overlayRef = that.overlay.create({
                    positionStrategy,
                    scrollStrategy: that.overlay.scrollStrategies.close()
                });

                that.overlayRef.attach(new TemplatePortal(that.contextMenu, that.viewContainerRef, {
                    $implicit: { person: that.person, date: e.date }
                }));

                that.subscription = fromEvent<MouseEvent>(document, 'click')
                    .pipe(
                        filter(event => {
                            const clickTarget = event.target as HTMLElement;
                            return !!that.overlayRef && !that.overlayRef.overlayElement.contains(clickTarget);
                        }),
                        take(1)
                    ).subscribe(() => that.close());
            },
            contextMenuItems: [
            ],
        });

        // $(`#${person.id}`).data('calendar').setDataSource(dataSource);
    }

    contextMenuActionClick(action, data) {
        this.close();
        this.contextMenuActionClicked.emit({
            action: action,
            data: data
        });
    }

    private close() {
        this.subscription && this.subscription.unsubscribe();
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }
}
