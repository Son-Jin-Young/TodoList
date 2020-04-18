import {Observable} from '../common/Observable.js';
import {EventChannel} from '../common/EventChannel.js';
import {TodoStatus} from '../constant/TodoStatus.js';
import {ActionEvent} from '../constant/ActionEvent.js';

export class TodoModel extends EventChannel/* Observable */ {
    //Controller, View의 존재를 전혀 모르게 구현.
    constructor(url) {
        super();
        this.todos = [];
        this.url = url;
    }

    addTodo(todo) {
        
        this.todos = [...this.todos, {title: todo, id: this.maxId + 1, status: TodoStatus.TODO}];
        this.publish(ActionEvent.REFRESH_LIST, this.todos);
    }

    doneTodo(todo) {

        const findTodo = this.todos.find((item) => item.id === todo.id);
        findTodo.status = findTodo.status === TodoStatus.DONE ? TodoStatus.TODO : TodoStatus.DONE;
        this.publish(ActionEvent.REFRESH_LIST, this.todos);
    }

    saveInitData(data) {
        this.todos = data;
        this.publish(ActionEvent.INIT, this.todos);
    }
    
    get maxId() {
        return Math.max(this.todos.map((todo) => Number(todo.id)));
    }

    get todoList () {
        return this.todos;
    }

    getInitialData() {
        fetch(this.url)
        .then(res => res.json())
        .then(data => this.saveInitData(data));
    }
}
