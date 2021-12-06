import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { endpoints } from 'src/app/shared/endpoints';
import { catchError, map } from 'rxjs/operators';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { Todo } from '../_models/todo.model';
import { List } from '../_models/list.model';

@Injectable()
export class HttpProviders {
  header: any = HttpHeaders;
  private currentUserSubject: any;

  constructor(
    private http: HttpClient,
    public toastr: ToastrService,
    // public toastr: ToastrService
  ) {
    this.setHeader();
  }

  setHeader() {
    this.header = new HttpHeaders()
      // .set("Authorization", 'Bearer ' + localStorage.getItem("token"))
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/json")
      .set("Content-Type", "application/json");
  }
  setTokenHeader() {
    this.header = new HttpHeaders()
      .set("Authorization", 'Bearer ' + localStorage.getItem("token"))
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/json")
      .set("Content-Type", "application/json");
  }

  GetTodos(listId: number) {
    this.setHeader();
    return this.http.get(endpoints.Todo.GetTodos.path + "?listId=" + listId, { headers: this.header, params: {} }).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        this.toastr.error('Oppps! Bir Sorun Oluştu.', 'Hata!', {
          timeOut: 3000
        });
        // return throwError(error);
        console.log(error);
        return error;
      })
    );
  }

  GetTodosWithDate(listId: number, finishTime: Date, type: number) {
    let asd: number = finishTime.getMonth() + 1;
    this.setHeader();
    return this.http.get(endpoints.Todo.GetTodosWithDate.path + "?listId=" + listId + "&finishDate=" + finishTime.getUTCFullYear() + "-" + asd + "-" + finishTime.getDate() + "T00:00:00.0" + "&type=" + type, { headers: this.header, params: {} }).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        this.toastr.error('Oppps! Bir Sorun Oluştu.', 'Hata!', {
          timeOut: 3000
        });
        // return throwError(error);
        console.log(error);
        return error;
      })
    );
  }

  GetLists() {
    this.setHeader();
    return this.http.get(endpoints.Todo.GetLists.path, { headers: this.header, params: {} }).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        this.toastr.error('Oppps! Bir Sorun Oluştu.', 'Hata!', {
          timeOut: 3000
        });
        // return throwError(error);
        console.log(error);
        return error;
      })
    );
  }

  CreateList(name: string) {
    this.setHeader();
    return this.http.get(endpoints.Todo.CreateList.path + '?name=' + name, { headers: this.header, params: {} }).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        this.toastr.error('Oppps! Bir Sorun Oluştu.', 'Hata!', {
          timeOut: 3000
        });
        // return throwError(error);
        console.log(error);
        return error;
      })
    );
  }

  DeleteList(id: number) {
    this.setHeader();
    return this.http.get(endpoints.Todo.DeleteList.path + '?id=' + id, { headers: this.header, params: {} }).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        this.toastr.error('Oppps! Bir Sorun Oluştu.', 'Hata!', {
          timeOut: 3000
        });
        // return throwError(error);
        console.log(error);
        return error;
      })
    );
  }

  CreateTodo(postModel: Todo) {
    this.setHeader();
    return this.http.post<Todo>(endpoints.Todo.CreateTodo.path, postModel, { headers: this.header })
      .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          this.toastr.error('Oppps! Bir Sorun Oluştu.', 'Hata!', {
            timeOut: 3000
          });
          console.log(error);
          return error;
          // return throwError(error);
        })
      );
  }

  UpdateTodo(postModel: Todo) {
    this.setHeader();
    return this.http.post<Todo>(endpoints.Todo.UpdateTodo.path, postModel, { headers: this.header })
      .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          this.toastr.error('Oppps! Bir Sorun Oluştu.', 'Hata!', {
            timeOut: 3000
          });
          console.log(error);
          return error;
          // return throwError(error);
        })
      );
  }

  GetTodo(id: number) {
    this.setHeader();
    return this.http.get(endpoints.Todo.GetTodoById.path + '?id=' + id, { headers: this.header, params: {} }).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        this.toastr.error('Oppps! Bir Sorun Oluştu.', 'Hata!', {
          timeOut: 3000
        });
        // return throwError(error);
        console.log(error);
        return error;
      })
    );
  }

  DeleteTodo(id: number) {
    this.setHeader();
    return this.http.get(endpoints.Todo.DeleteTodo.path + '?id=' + id, { headers: this.header, params: {} }).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        if (error.status == 200) {
          return "B";
        }
        else {
          this.toastr.error('Oppps! Bir Sorun Oluştu.', 'Hata!', {
            timeOut: 3000
          });
          console.log(error);
          return error;
        }
      })
    );
  }

}
