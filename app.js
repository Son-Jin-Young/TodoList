import {TodoModel, ListView, TodoController, ListFoldButtonView, InputView, FoldModel} from './todo.js';

const initialDataUrl = 'http://localhost:3000/data/initData.json';
// Model
const todoModel = new TodoModel();
const foldModel = new FoldModel();

// View
const inputView = new InputView();
const listView = new ListView();
const foldButton = new ListFoldButtonView();

// Control
const todoController = new TodoController(todoModel, foldModel, inputView, listView, foldButton, initialDataUrl);
todoController.getInitData(initialDataUrl);