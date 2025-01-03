import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './task.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  
  constructor(private http: HttpClient) { }
  
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTask(task: Task): Observable<any> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, completed: boolean): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { completed: completed ? 1 : 0 });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  loadTasks() {
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (tasks) => {
        this.tasksSubject.next(tasks);
      },
      error: (err) => {
        console.error('Error al cargar las tareas', err);
      }
    });
  }
  
}
