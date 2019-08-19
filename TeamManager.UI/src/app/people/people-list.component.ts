import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { PeopleService } from './people.service';
import { Person } from './person';
import { FeedbackService } from '../feedback/feedback.service';
import { TemplatePortal } from '@angular/cdk/portal';
import { fromEvent, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

declare var $: any;

@Component({
    selector: 'people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
    people: Person[];
    overlayRef: OverlayRef | null;
    private sub: Subscription;
    @ViewChild('feedbackMenu', { static: true }) feedbackMenu: TemplateRef<any>;

    constructor(private peopleService: PeopleService,
        private feedbackService: FeedbackService,
        public overlay: Overlay,
        public viewContainerRef: ViewContainerRef) { }

    ngOnInit(): void {
        this.peopleService.getPeople().subscribe(people => this.people = people);
    }

    addOneOnOne(target) {
        this.close();
        alert(JSON.stringify(target));
        debugger;
    }

    addFeedback(target) {
        this.close();
        alert(JSON.stringify(target));
        debugger;
    }

    showCalendar(person) {
        person.showCalendar = true;
        if (!person.calendarInitialized) {
            person.calendarInitialized = true;
            const that = this;
            $(`#${person.id}`).calendar({
                maxDate: new Date(),
                enableContextMenu: true,
                style: "background",
                customDayRenderer: function (element, date) {
                    if (that.isToday(date)) {
                        $(element).css('border', '2px solid blue');
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

                    that.overlayRef.attach(new TemplatePortal(that.feedbackMenu, that.viewContainerRef, {
                        $implicit: { personId: e.target.id, date: e.date}
                    }));

                    that.sub = fromEvent<MouseEvent>(document, 'click')
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
        }

        this.feedbackService.getFeedbackItems(person.Id).subscribe(items => {
            var dataSource = [];
            items.forEach(element => {
                dataSource.push({
                    name: element.message,
                    startDate: element.date,
                    endDate: element.date,
                    color: '#2C8FC9'
                })
            });

            $(`#${person.id}`).data('calendar').setDataSource(dataSource);
        });
    }

    close() {
        this.sub && this.sub.unsubscribe();
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }

    isToday(someDate) {
        const today = new Date()
        return someDate.getDate() == today.getDate() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()
    }
}
