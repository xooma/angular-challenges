import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
  randTeacher,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: ` <ng-template #customImg>
      <img src="assets/img/student.webp" width="200px" />
    </ng-template>

    <app-card
      [customImageTemplate]="customImg"
      [list]="students"
      [type]="cardType"
      (add)="addOne()"
      (delete)="deleteOne($event)"
      customClass="bg-light-green" />`,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  addOne() {
    this.store.addOne(randStudent());
  }

  deleteOne(id: number) {
    this.store.deleteOne(id);
  }
}
