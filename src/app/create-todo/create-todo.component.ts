import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { locale } from 'devextreme/localization';
import { ToastrService } from 'ngx-toastr';
import { Todo } from '../_models/todo.model';
import { HttpProviders } from '../_services/http.provider';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {

  todo: Todo = new Todo();

  listId: number = 0;
  title: string = "";
  description: string = "";
  finishTime: Date = new Date();

  constructor(public toastr: ToastrService, private api: HttpProviders, public dialogRef: MatDialogRef<CreateTodoComponent>, @Inject(MAT_DIALOG_DATA) public data: { id: number, listId: number }) {
    this.listId = data.listId;
    this.todo.listId = this.listId;
    if (data.id) {
      // güncelleme için fonksiyon çağırma
      this.GetTodo(data.id);
    }
    else {
      this.todo.finishTime = new Date();
    }
  }

  ngOnInit(): void {
    locale(navigator.language);
  }

  GetTodo(id: number) {
    // güncelleme ise bilgileri getirir
    this.api.GetTodo(id).subscribe((data: Todo) => {
      if (data) {
        this.todo = data;
        this.title = this.todo.title;
        this.description = this.todo.description;
        this.finishTime = this.todo.finishTime;
      }
    });
  }

  Save() {
    // kaydetme
    if (this.todo) {
      this.todo.title = this.title;
      this.todo.description = this.description;
      this.todo.finishTime = this.finishTime;
      if (this.todo.id) {
        // güncelleme
        this.api.UpdateTodo(this.todo).subscribe((data: any) => {
          if (data) {
            this.toastr.success("Todo Başarıyla Güncellendi!", "Bilgi!");
            this.dialogRef.close();
          }
        })
      } else {
        // ekleme
        if (this.todo.title) {
          this.api.CreateTodo(this.todo).subscribe((data: any) => {
            if (data) {
              this.toastr.success("Todo Başarıyla Oluşturuldu!", "Bilgi!");
              this.dialogRef.close();
            }
          });
        }
        else {
          this.toastr.warning("Başlık Girmelisiniz!", "Bilgi!");
        }
      }
    }

  }


}
