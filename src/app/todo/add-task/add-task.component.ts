import { Component, HostListener } from '@angular/core';
import { TaskService } from '../../task.service';
import { Task } from '../../task.model';

@Component({
  selector: 'app-add-task',
  standalone: false,

  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  isModalOpen = false;
  taskId: number = 0;
  taskName: string = '';
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.isModalOpen = false;
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }


  addTask() {
    if (this.taskName.trim() === '') {
      return;
    }

    const newTask: Task = {
      id: 0,
      name: this.taskName,
      completed: false,
    };

    this.taskService.addTask(newTask).subscribe({
      next: (task) => {
        console.log('Tarea añadida:', task);
        this.taskService.loadTasks();
        this.closeModal();
        this.taskName = '';
      },
      error: (err) => {
        console.error('Error al añadir tarea:', err);
        alert('Hubo un problema al añadir la tarea. Verifica la consola para más detalles.');
      },
    });
  }
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeModal();
  }
}
