import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CalendarScrollComponent } from './cal-scroll.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    HelloComponent,
    CalendarScrollComponent,
    TodoListComponent,
  ],
  bootstrap: [AppComponent],
  providers: [DatePipe],
})
export class AppModule {}
