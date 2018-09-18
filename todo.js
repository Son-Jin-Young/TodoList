import Observable from './common.js';

class TodoModel extends Observable {
    //Controller, View의 존재를 전혀 모르게 구현.
    constructor() {
        super();
        this.todos = [];
    }

    addTodo(todo) {
        this.todos = [...this.todos, todo];
        this.notify(this.todos);
    }

    get todoList () {
        return this.todos;
    }
}

class FoldModel extends Observable {
    constructor() {
        super();
        this.isFold = false;
    }

    toggleFold() {
        this.isFold = !this.isFold;
        this.notify(this.isFold);
    }

    get fold() {
        return this.isFold;
    }
}


// class TodoController {
//     constructor(todoModel, foldModel, inputView, listView, foldButton) {
//         this.todoModel    = todoModel;
//         this.foldModel = foldModel;

//         this.inputView    = inputView;
//         this.listView     = listView;
//         this.foldButton = foldButton;

//         this.initService();
//     }

//     initService() {
//         this.inputView.addTodoHandler = this.addTodoHandler.bind(this);
//         this.foldButton.addFoldHandler = this.addFoldHandler.bind(this);
//     }

//     // View의 이벤트를 연결 시킬 메서드
//     addTodoHandler(todoString) {
//         if(!todoString) return;
//         this.todoModel.addTodo.call(this.todoModel, todoString, this.afterAddTodo.bind(this));
//     }

//     // View의 이벤트의 후처리 이벤트
//     afterAddTodo(todoArray) {
//         this.renderInputView(todoArray);
//         this.renderListView(todoArray);
//     }

//     addFoldHandler() {
//         this.foldModel.toggleFold.call(this.foldModel, this.afterToggleFold.bind(this));
//     }

//     afterToggleFold(isFold) {
//         this.renderFoldButton(isFold);
//     }

//     renderInputView() {
//         this.inputView.render();
//     }

//     renderListView(todoArray) {
//         this.listView.render(todoArray);
//     }

//     renderFoldButton(isFold) {
//         this.foldButton.render(isFold);
//         this.listView.toggle(isFold);
//     }
// }

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
    constructor(todoModel, todoModelListFold) {
        this.listElement = document.querySelector(".todolist");
        this.todoModel = todoModel;
        this.todoModelListFold = todoModelListFold;

        this._ = {
            displayClassName : "visible"
        }

        this.todoList = null;
        this.subscribe();
    }

    subscribe() {
        this.todoModel.subscribe((todoList) => {
            this.todoList = todoList;
            this.render(todoList);
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
        this.foldModel.subscribe((isFold) => {
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