import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TasksService } from '../../../services/tasks.service';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-tasks-add',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './tasks-add.component.html',
  styleUrl: './tasks-add.component.css',
})
export class TasksAddComponent {
  formVisibility: boolean = false;
  addTaskForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  @Output() task: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(private _tasksService: TasksService) {}

  get taskName() {
    return this.addTaskForm.get('name');
  }

  get taskDescription() {
    return this.addTaskForm.get('description');
  }

  showForm() {
    this.formVisibility = this.formVisibility === true ? false : true;
  }

  addTask() {
    this.addTaskForm.markAllAsTouched();
    if (this.addTaskForm.valid) {
      let date: string = new Date().toISOString();
      date = date.split('T')[0];
      const formData = {
        name: this.taskName?.value,
        description: this.taskDescription?.value,
        startDate: date,
        status: 'not completed',
      };
      this._tasksService.addTask(formData).subscribe({
        next: (res) => {
          this.task.emit(formData);
          this.formVisibility = false;
          this.addTaskForm.reset()
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
