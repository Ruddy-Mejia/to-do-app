import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { Task } from '../../task.model';


@Component({
  selector: 'app-list',
  standalone: false,

  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    // Suscribirse al BehaviorSubject para obtener las tareas actualizadas
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks; // Actualiza la lista de tareas
    });

    // Cargar las tareas iniciales desde el servidor
    this.taskService.loadTasks();
  }

  toggleTaskCompletion(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };

    this.taskService.updateTask(task.id, updatedTask.completed).subscribe({
      next: () => {
        console.log('Estado de la tarea actualizado:', updatedTask);
        task.completed = updatedTask.completed; // Actualiza el estado en tiempo real
      },
      error: (err) => {
        console.error('Error al actualizar la tarea:', err);
        alert('Hubo un problema al actualizar la tarea. Verifica la consola para más detalles.');
      },
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        console.log(`Tarea con ID ${task.id} eliminada.`);
        this.tasks = this.tasks.filter(t => t.id !== task.id); // Actualiza la lista local
      },
      error: (err) => {
        console.error('Error al eliminar tarea:', err);
        alert('No se pudo eliminar la tarea.');
      }
    });
  }

  // toggleTaskStatus(id: number) {
  //   this.taskService.toggleTaskStatus(id);
  // }

  // deleteTask(id: number) {
  //   this.taskService.deleteTask(id);
  // }
}
