import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  baseUrl: string = 'http://localhost:3000/api/v1';

  constructor(private _http: HttpClient) {}

  addTask(task: any): Observable<any> {
    return this._http.post(`${this.baseUrl}/tasks`, task);
  }

  getTasks(): Observable<any> {
    return this._http.get(`${this.baseUrl}/tasks`);
  }

  updateStatus(id: string): Observable<any> {
    return this._http.put(`${this.baseUrl}/tasks/${id}`, id);
  }
}
