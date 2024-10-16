import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Task } from '../../../models/task.model';
import { TasksService } from '../../../services/tasks.service';
import { NgClass } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-tasks-element',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './tasks-element.component.html',
  styleUrl: './tasks-element.component.css',
})
export class TasksElementComponent implements OnInit, OnChanges {
  tasks: any[] = [];
  updateFormVisibilty: boolean = false;
  taskDate: string = '';
  taskStatus: string = '';
  taskId: string = '';

  updateTaskForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  @Input() task!: Task;

  constructor(private _taskService: TasksService) {}

  ngOnInit(): void {
    this.fillTasks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.tasks.unshift(this.task);
  }

  fillTasks() {
    this._taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data.data.reverse();
        console.log(this.tasks);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  comleteTask(id: string, index: number) {
    console.log(id);
    this._taskService.updateStatus(id).subscribe({
      next: (data) => {
        let task = this.tasks.find((task) => {
          return task._id == id;
        });
        task.status = 'completed';
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showUpdateTaskForm(task: any) {
    this.updateFormVisibilty = true;
    this.updateTaskForm.patchValue({ name: task.name });
    this.updateTaskForm.patchValue({ description: task.description });
    this.taskId = task._id;
    this.taskDate = task.startDate;
    this.taskStatus = task.status;
  }

  hideUpdateForm() {
    this.updateFormVisibilty = false;
  }

  updateTask() {
    let id = this.taskId;
    let formData = {
      ...this.updateTaskForm.value,
    };

    this._taskService.updateTask(id, formData).subscribe({
      next: (res) => {
        console.log('task updated successfully');
        let task = this.tasks.find((task) => {
          return task._id === id;
        });
        task.name = formData.name;
        task.describtion = formData.describtion;
        this.updateFormVisibilty = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
