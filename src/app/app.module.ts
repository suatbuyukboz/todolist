import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { FilterComponent } from './filter/filter.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { ToastrModule } from 'ngx-toastr';
import { HttpProviders } from './_services/http.provider';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DxRadioGroupModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    CreateTodoComponent,
    FilterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DragDropModule,
    DxButtonModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxRadioGroupModule,
  ],
  providers: [HttpProviders],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
