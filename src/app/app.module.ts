import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { FilterTaskPipe } from './filter-task.pipe';
import { FilterParentTaskPipe } from './filter-parent-task.pipe';
import { FilterPriorityFromPipe } from './filter-priority-from.pipe';
import { FilterPriorityToPipe } from './filter-priority-to.pipe';
import { FilterStartDatePipe } from './filter-start-date.pipe';
import { FilterEndDatePipe } from './filter-end-date.pipe';
import { AddprojectComponent } from './addproject/addproject.component';
import { AdduserComponent } from './adduser/adduser.component';
import { FilterUserPipe } from './filter-user.pipe';
import { FilterProjectPipe } from './filter-project.pipe';
import { FilterUserByLastAndFirstNamePipe } from './filter-user-by-last-and-first-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddtaskComponent,
    UpdatetaskComponent,
    ViewtaskComponent,
    FilterTaskPipe,
    FilterParentTaskPipe,
    FilterPriorityFromPipe,
    FilterPriorityToPipe,
    FilterStartDatePipe,
    FilterEndDatePipe,
    AddprojectComponent,
    AdduserComponent,
    FilterUserPipe,
    FilterProjectPipe,
    FilterUserByLastAndFirstNamePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
