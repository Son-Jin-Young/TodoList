import {TodoModel, ListView, ListFoldButtonView, InputView, FoldModel} from './todo.js';

const initialDataUrl = 'http://localhost:3002/data/initData.json';
// Model
const todoModel = new TodoModel();
const foldModel = new FoldModel();

// View
const inputView = new InputView(todoModel);
const listView = new ListView(todoModel, foldModel);
const foldButton = new ListFoldButtonView(foldModel);

// Control
// const todoController = new TodoController(todoModel, foldModel, inputView, listView, foldButton);