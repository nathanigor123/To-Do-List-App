import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { Task } from '../../models/task';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [MessageService,ConfirmationService]
})
export class DashboardComponent implements OnInit {

  tasks: Task[] = [];
  totalRecords: number | undefined;
  displayDialogAddingTask = false;
  displayDialogEditingTask = false;
  selectedTask?: Task;

  constructor(
    private taskService: TaskService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe((data: Task[]) => {
      this.tasks = data;
      this.totalRecords = this.tasks.length;
    });
  }

  openCreatingTaskDialog(): void {
    this.displayDialogAddingTask = true;
  }

  openUpdatingTaskDialog(task: Task): void {
    this.selectedTask =task;
    this.displayDialogEditingTask = true;
  }


  hideCreatedOrUpdatedTaskDialog(task: Task): void {
    this.displayDialogAddingTask = false;
    this.displayDialogEditingTask = false;
    if (task) {
      this.getAllTasks();
    }
  }

  hideDialogErrorSavingOrUpdatingTask(event: boolean): void {
   if(event){
    this.displayDialogAddingTask = false;
   }
  }

  deleteTask(task: Task): void {
    this.confirmationService.confirm({
      header: 'Confirmation de suppression !',
      message: 'Supprimer la tâche ' + task.title + '  de la liste des tâches ',
      icon: 'icofont-warning text-danger',
      acceptLabel: 'Supprimer',
      rejectLabel: 'Annuler',
      acceptButtonStyleClass: 'btn btn-danger btn-sm',
      rejectButtonStyleClass: 'btn btn-light btn-sm',
      accept: () => {
        this.taskService.deleteTask( task.id).subscribe(
          () => {
            this.getAllTasks();
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail: 'La tâche ' + task.title + ' a été supprimé avec succès'
            });

          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Désolé une erreur d\'est produite.'
            });

          }
        );
      }
    });
  }

}
