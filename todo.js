import {Observable, EventChannel} from './common.js';

class TodoModel extends EventChannel/* Observable */ {
    //Controller, View의 존재를 전혀 모르게 구현.
    constructor(url) {
        super();
        this.todos = [];
        this.url = url;
    }

    addTodo(todo) {
        this.todos = [...this.todos, todo];
        // this.notify(this.todos);
        this.publish('CHANGE_TODO_LIST', this.todos);
    }

    saveInitData(data) {
        this.todos = data;
        this.publish('FETCH_INIT_DATA', this.todos);
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

class FoldModel extends EventChannel/* Observable */ {
    constructor() {
        super();
        this.isFold = false;
    }

    toggleFold() {
        this.isFold = !this.isFold;
        // this.notify(this.isFold);
        this.publish('CLICK_TOGGLE_BTN', this.isFold);
    }

    get fold() {
        return this.isFold;
    }
}

//view들은 model이 어떤 것인지 전혀 모른다.
class InputView {
    constructor(actionDispatcher, todoModel) {
        this.regButton = document.querySelector("button");
        this.inputElement = document.querySelector("input[name=todo]")
        this.todoModel = todoModel;
        this.actionDispatcher = actionDispatcher;

        this.initEvents();
    }

    initEvents() {
        this.regButton.addEventListener("click", (e) => {
            const todoText = this.getTodoValue();
            this.actionDispatcher.dispatch('ADD_BUTTON', todoText);
            this.render();
        });

        this.inputElement.addEventListener("keydown", (e) => {
            if(e.keyCode !== 13) return;
            const todoText = this.getTodoValue();
            this.actionDispatcher.dispatch('CHANGE_TODO_LIST', todoText);
            this.render();
        });
    }

    getTodoValue() { 
        return document.querySelector("input[name=todo]").value;
    }

    render(inputData = "") {
        this.inputElement.value = inputData;
    }
}

class ListView {
    constructor(actionDispatcher, todoModel, foldModel) {
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
        this.todoModel.subscribe('CHANGE_TODO_LIST', (todoList) => {
            this.todoList = todoList;
            this.render(todoList);
        });

        this.todoModel.subscribe('FETCH_INIT_DATA', (todoList) => {
            this.todoList = todoList;
            this.render(todoList);
        });

        this.foldModel.subscribe('CLICK_TOGGLE_BTN', (isFold) => {
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
    constructor(actionDispatcher, foldModel) {
        // 컨트롤할 View
        this.foldButton = document.querySelector('.fold');
        // view의 이벤트
        this.addFoldHandler = null;
        this.foldModel = foldModel;
        this.actionDispatcher = actionDispatcher;
        this.initEvents();
        this.subscribe();
    }

    subscribe() {
        this.foldModel.subscribe('CLICK_TOGGLE_BTN', (isFold) => {
            this.render(isFold);
        }); 
    }

    initEvents() {
        this.foldButton.addEventListener('click', (e) => {
            // this.foldModel.toggleFold.call(this.foldModel);
            this.actionDispatcher.dispatch('CLICK_TOGGLE_BTN');
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