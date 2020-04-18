import {ActionEvent} from '../constant/ActionEvent.js';
import {TodoStatus} from '../constant/TodoStatus.js';

export class ListView {
    constructor(actionDispatcher, todoModel, foldModel) {
        this.listElement = document.querySelector('.todolist');
        this.actionDispatcher = actionDispatcher;
        this.todoModel = todoModel;
        this.foldModel = foldModel;

        this.subscribe();
    }

    subscribe() {
        this.todoModel.subscribe(ActionEvent.REFRESH_LIST, (todoList) => {
            this.render(todoList);
        });

        this.todoModel.subscribe(ActionEvent.INIT, (todoList) => {
            this.render(todoList);
        });

        this.foldModel.subscribe(ActionEvent.TOGGLE_LIST, (isFold) => {
            this.toggle(isFold);
        });
    }

    render(todoList) {
        this.listElement.innerHTML = todoList.reduce((html, todo) =>{
            return `${html} <li id='${todo.id}' class="${todo.status === TodoStatus.TODO ? '' : 'complete'}"> ${todo.title} <span class='deleteX'> X </span> </li>`;
        }, '');
        
        document.querySelectorAll('.deleteX').forEach((element) => {
            element.addEventListener('click', (event) => {
                const todo = todoList.find((todo) => String(todo.id) === event.target.parentElement.id);
                this.actionDispatcher.dispatch(ActionEvent.CHANGE_STATUS, todo);
            });
        });
    }

    toggle(isFold) {
        if (isFold) {
            this.listElement.style.display = 'none';
        } else {
            this.listElement.style.display = 'block';
        }
    }
}
