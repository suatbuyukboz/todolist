/-- END POINTLER TUTULACAK --/;
import { servers } from './configuration';

export const endpoints = {
  Todo: {
    GetTodos: {
      path: servers.real + '/Todo/GetTodos'
    },
    GetTags: {
      path: servers.real + '/Todo/GetTodosWithDate'
    },
    CreateTodo: {
      path: servers.real + '/Todo/CreateTodo'
    },
    UpdateTodo: {
      path: servers.real + '/Todo/UpdateTodo'
    },
    DeleteTodo: {
      path: servers.real + '/Todo/DeleteTodo'
    },
    ChangeStatu: {
      path: servers.real + '/Todo/ChangeStatu'
    },
    GetLists: {
      path: servers.real + '/Todo/GetLists'
    },
    CreateList: {
      path: servers.real + '/Todo/CreateList'
    },
    DeleteList: {
      path: servers.real + '/Todo/DeleteList'
    },
    GetTodoById: {
      path: servers.real + '/Todo/GetTodoById'
    },
    GetTodosWithDate: {
      path: servers.real + '/Todo/GetTodosWithDate'
    }
    
  },
};
