import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TooltipModule} from 'primeng/tooltip';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CardModule} from "primeng/card";
import {MessagesModule} from 'primeng/messages';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DialogModule} from "primeng/dialog";
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Import Primeng Module
    ButtonModule,
    TableModule,
    CardModule,
    TooltipModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    MessagesModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule,

  ],
  exports: [
    // Export Angular Module
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

     // Export Primeng Module
    ButtonModule,
    TableModule,
    CardModule,
    TooltipModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    MessagesModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule,

  ]
})
export class SharedModule { }
