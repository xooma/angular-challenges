import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: ` <ng-template #customImg>
      <img src="assets/img/teacher.png" width="200px" />
    </ng-template>

    <app-card
      [customImageTemplate]="customImg"
      [list]="teachers"
      [type]="cardType"
      (add)="addOne()"
      (delete)="deleteOne($event)"
      customClass="bg-light-green" />`,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  cardType = CardType.TEACHER;

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  addOne() {
    this.store.addOne(randTeacher());
  }

  deleteOne(id: number) {
    this.store.deleteOne(id);
  }
}
