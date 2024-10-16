import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksElementComponent } from './tasks-element.component';

describe('TasksElementComponent', () => {
  let component: TasksElementComponent;
  let fixture: ComponentFixture<TasksElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
