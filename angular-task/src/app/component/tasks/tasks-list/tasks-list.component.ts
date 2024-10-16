import { Component } from '@angular/core';
import { TasksElementComponent } from '../tasks-element/tasks-element.component';
import { TasksAddComponent } from '../tasks-add/tasks-add.component';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [TasksElementComponent, TasksAddComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
})
export class TasksListComponent {
  task: any = {} as Task;

  addedTask(task: any) {
    this.task = task;
  }
}
