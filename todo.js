import {Observable, EventChannel} from './common.js';

class TodoModel extends EventChannel/* Observable */ {
    //Controller, View의 존재를 전혀 모르게 구현.
    constructor() {
        super();
        this.todos = [];
    }

    addTodo(todo) {
        this.todos = [...this.todos, todo];
        // this.notify(this.todos);
        this.publish('LISTING_TODOS', this.todos);
    }

    get todoList () {
        return this.todos;
    }
}

class FoldModel extends EventChannel/* Observable */ {
    constructor() {
        super();
        this.isFold = false;
    }

    toggleFold() {
        this.isFold = !this.isFold;
        // this.notify(this.isFold);
        this.publish('CHANGE_FOLD', this.isFold);
    }

    get fold() {
        return this.isFold;
    }
}

//view들은 model이 어떤 것인지 전혀 모른다.
class InputView {
    constructor(todoModel) {
        this.regButton = document.querySelector("button");
        this.inputElement = document.querySelector("input[name=todo]")
        // this.addTodoHandler = addTodoHandler;
        this.todoModel = todoModel;
        this.initEvents();
    }

    initEvents() {
        this.regButton.addEventListener("click", (e) => {
            const todoText = this.getTodoValue();
            this.addTodoHandler(todoText);
        });

        this.inputElement.addEventListener("keydown", (e) => {
            if(e.keyCode !== 13) return;
            const todoText = this.getTodoValue();
            this.addTodoHandler(todoText);
        });
    }

    addTodoHandler(todoString) {
        this.todoModel.addTodo.call(this.todoModel, todoString);
        this.render();
    }

    getTodoValue() { 
        return document.querySelector("input[name=todo]").value;
    }

    render(inputData = "") {
        this.inputElement.value = inputData;
    }
}

class ListView {
    constructor(todoModel, foldModel) {
        this.listElement = document.querySelector(".todolist");
        this.todoModel = todoModel;
        this.foldModel = foldModel;

        this._ = {
            displayClassName : "visible"
        }

        this.todoList = null;
        this.subscribe();
    }

    subscribe() {
        this.todoModel.subscribe('LISTING_TODOS', (todoList) => {
            this.todoList = todoList;
            this.render(todoList);
        });

        this.foldModel.subscribe('CHANGE_FOLD', (isFold) => {
            this.toggle(isFold);
        });
    }

    render(todoList) {
        let listHTML = todoList.reduce((html, todo) => {
            return `${html} <li> ${todo} <span class="deleteX"> X </span> </li> `;
        }, "")

        this.todoList = todoList;
        this.listElement.innerHTML = listHTML;
    }

    toggle(isFold) {
        if (isFold) {
            this.listElement.style.display = 'none';
        } else {
            this.listElement.style.display = 'block';
        }
    }
}

class ListFoldButtonView {
    constructor(foldModel) {
        // 컨트롤할 View
        this.foldButton = document.querySelector('.fold');
        // view의 이벤트
        this.addFoldHandler = null;
        this.foldModel = foldModel;
        this.initEvents();
        this.subscribe();
    }

    subscribe() {
        this.foldModel.subscribe('CHANGE_FOLD', (isFold) => {
            this.render(isFold);
        }); 
    }

    initEvents() {
        this.foldButton.addEventListener('click', (e) => {
            this.foldModel.toggleFold.call(this.foldModel);
        });
    }
 
    render(isFold) {
        if (isFold) {
            this.foldButton.innerHTML = '펼치기';
        } else {
            this.foldButton.innerHTML = '접기';
        }
    }

}

export {TodoModel, ListView, FoldModel, InputView, ListFoldButtonView};