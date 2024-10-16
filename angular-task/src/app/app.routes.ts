import { Routes } from '@angular/router';
import { TasksListComponent } from './component/tasks/tasks-list/tasks-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksListComponent },
];
