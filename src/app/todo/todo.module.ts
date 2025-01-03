import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { FormsModule } from '@angular/forms'; 



@NgModule({
  declarations: [
    ListComponent,
    AddTaskComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ListComponent,
    AddTaskComponent,
  ]
})
export class TodoModule { }
