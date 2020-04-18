import {Observable} from '../common/Observable.js';
import {EventChannel} from '../common/EventChannel.js';
import {TodoStatus} from '../constant/TodoStatus.js';
import {ActionEvent} from '../constant/ActionEvent.js';

export class CountModel extends EventChannel {
    constructor(actionDispatcher, todoModel) {
        super();
        this.todoElement = document.querySelector('.todo-count');
        this.doneElement = document.querySelector('.done-count');

        this.actionDispatcher = actionDispatcher;
        this.todoModel = todoModel;

        this.todoCount = 0;
        this.doneCount = 0;   

        this.subscribe();
    }

    subscribe() {
        this.todoModel.subscribe(ActionEvent.REFRESH_LIST, (todoList) => {
            this.render(todoList);
        });

        this.todoModel.subscribe(ActionEvent.INIT, (todoList) => {
            this.render(todoList);
        });
    }

    render(todoList) {
        this.todoCount = todoList.filter((todo) => todo.status === TodoStatus.TODO).length;
        this.doneCount = todoList.filter((todo) => todo.status === TodoStatus.DONE).length;

        this.todoElement.innerHTML = this.todoCount;
        this.doneElement.innerHTML = this.doneCount;
    }
}
