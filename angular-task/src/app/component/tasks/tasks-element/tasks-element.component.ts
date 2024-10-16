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
  upateTaskForm: FormGroup = new FormGroup({
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

  updateTask(task: any) {
    this.updateFormVisibilty = true;
    console.log(task);
  }

  hideUpdateForm() {
    this.updateFormVisibilty = false;
  }
}
