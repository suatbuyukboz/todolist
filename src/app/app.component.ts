import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { FilterComponent } from './filter/filter.component';
import { List } from './_models/list.model';
import { Todo } from './_models/todo.model';
import { HttpProviders } from './_services/http.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todolist';

  wait: Todo[] = [];
  work: Todo[] = [];
  finish: Todo[] = [];
  selectedList: number = 0;

  lists: List[] = [];
  todos: Todo[] = [];

  filterFinishTime: Date;
  filterType: number;

  newlistname: string;
  selecteditemid: number;
  searchkey: string = "";

  constructor(public dialog: MatDialog, private api: HttpProviders, public toastr: ToastrService) {
    this.GetLists();
  }

  openAdd(): void {
    // yeni todo ekleme sayfasını açar
    const dialogRef = this.dialog.open(CreateTodoComponent, {
      panelClass: 'my-class',
      data: {
        id: this.selecteditemid,
        listId: this.selectedList
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.GetTodos(this.selectedList);
      this.selecteditemid = null;
    });
  }

  openFilter(): void {
    // filtre sayfasını açar
    const dialogRef = this.dialog.open(FilterComponent, {
      panelClass: 'my-class',
      data: {
        time: this.filterFinishTime,
        type: this.filterType == 0 ? "Bugün" : this.filterType == 1 ? "Bu Hafta" : this.filterType == 2 ? "Bu Ay" : null
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.filterFinishTime = data[0];
      this.filterType = data[1];
      this.GetTodos(this.selectedList);
    });
  }

  GetLists() {
    // listeleri çekme
    this.lists = [];
    this.api.GetLists().subscribe((data: List[]) => {
      if (data) {
        this.lists = data;
        if (this.lists.length >= 1) {
          this.GetTodos(this.lists[0].id);
        }
      }
    })
  }

  CreateList() {
    // liste oluşturma
    if (this.newlistname != null && this.newlistname != "") {
      this.api.CreateList(this.newlistname).subscribe(data => {
        if (data) {
          this.GetLists();
          this.newlistname = "";
          this.toastr.success("Liste Başarıyla Oluşturuldu!", "Bilgi!");
        }
      });
    }
    else {
      this.toastr.warning("Lütfen Liste Adı Giriniz!", "Bilgi!");
    }
  }

  DeleteList(id) {
    // liste silme
    this.api.DeleteList(id).subscribe(data => {
      if (data) {
        this.toastr.success("Liste Başarıyla Silindi!", "Bilgi!");
        this.GetLists();
      }
    });
  }



  GetTodos(listId) {
    // liste içindeki todoları çekme
    this.wait = [];
    this.work = [];
    this.finish = [];
    this.selectedList = listId;
    if (this.filterFinishTime) {
      this.api.GetTodosWithDate(listId, this.filterFinishTime, this.filterType).subscribe(data => {
        if (data) {
          this.wait = data.filter(x => x.statu == 0 && x.title.includes(this.searchkey) == true);
          this.work = data.filter(x => x.statu == 1 && x.title.includes(this.searchkey) == true);
          this.finish = data.filter(x => x.statu == 2 && x.title.includes(this.searchkey) == true);
        }
      });
    }
    else {
      this.api.GetTodos(listId).subscribe(data => {
        if (data) {
          this.wait = data.filter(x => x.statu == 0 && x.title.includes(this.searchkey) == true);
          this.work = data.filter(x => x.statu == 1 && x.title.includes(this.searchkey) == true);
          this.finish = data.filter(x => x.statu == 2 && x.title.includes(this.searchkey) == true);
        }
      });
    }

  }

  DeleteTodo(id: any) {
    // todo silme
    this.api.DeleteTodo(id).subscribe(data => {
      if (data && data == "B") {
        this.toastr.success("Todo Başarıyla Silindi!", "Bilgi!");
        this.GetTodos(this.selectedList);
      }
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    // sürükle - bırak
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    let item: any = event.container.data[event.currentIndex];
    if (event.container.id == "cdk-drop-list-0") {
      item.statu = 0;
    }
    else if (event.container.id == "cdk-drop-list-1") {
      item.statu = 1;
    }
    else if (event.container.id == "cdk-drop-list-2") {
      item.statu = 2;
    }

    this.api.UpdateTodo(item).subscribe();
  }
}
