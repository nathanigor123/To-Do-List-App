import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  /**
   *  The URL to send the request
   */
  baseUrl: string;

  constructor(protected router: Router, protected httpClient: HttpClient) {
    this.baseUrl = environment.baseUrlApi;
  }

  getAllTasks(): Observable<Task[]> {
    console.log('make reqquest');
    return this.httpClient.get<Task[]>(`${this.baseUrl}/tasks`);
  }

  createTask(data: any = {}): Observable<Task> {
    return this.httpClient.post<Task>(`${this.baseUrl}/tasks`, data);
  }

  updateTask(taskId: string, data: any = {}): Observable<Task> {
    return this.httpClient.put<Task>(`${this.baseUrl}/tasks/${taskId}`, data);
  }

  deleteTask(taskId: string): Observable<Task> {
    return this.httpClient.delete<Task>(`${this.baseUrl}/tasks/${taskId}`);
  }

}
