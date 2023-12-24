import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../../models/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../../services/task/task.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-edit-task',
  templateUrl: './new-edit-task.component.html',
  styleUrl: './new-edit-task.component.scss',
  providers: [MessageService],
})
export class NewEditTaskComponent implements OnInit {
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() task?: Task;
  @Output() savedTask = new EventEmitter<Task>();
  @Output() errorSavingTask = new EventEmitter<any>();
  addFormTask!: FormGroup;
  taskData: any;
  errors: any;
  loading = false;
  submitted = false;
  taskErrors: any;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initAddFormTask();
    if(this.task){
      this.addFormTask.patchValue(this.task);
    }
  }

  initAddFormTask(): void {
    this.addFormTask = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['',[Validators.required]],
    });
  }

  saveFormTask(): void {
    if (this.addFormTask.invalid) {
      this.addFormTask.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.saveDataToApi(this.addFormTask.value);
  }

  saveDataToApi(data: any): void {

    if (this.mode == 'create') {
      this.taskService.createTask(data).subscribe(
        (task: Task) => {
          this.loading = false;
          this.submitted = false;
          this.addFormTask.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'La tâche ' + task.title + ' a été ajouté',
          });
          this.savedTask.emit(task);
        },
        (err) => {
          this.showError(err);
        }
      );
    }

    if (this.mode == 'edit' && this.task) {
      this.taskService.updateTask(this.task.id, data).subscribe(
        (task: Task) => {
          this.loading = false;
          this.submitted = false;
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'La tâche ' + task.title + ' a été modifié',
          });
          this.savedTask.emit(task);
        },
        (err) => {
         this.showError(err);
        }
      );
    }
  }

  showError(err: any): void{
    this.loading = false;
    this.errors = err.error.error;
    this.errorSavingTask.emit(true);
    this.messageService.add({
      severity: 'error',
      summary: 'error',
      detail: "Désolé une erreur d'est produite.",
    });
    console.log(err);
  }
}
