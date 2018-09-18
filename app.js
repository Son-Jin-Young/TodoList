import {TodoModel, ListView, ListFoldButtonView, InputView, FoldModel} from './todo.js';

const initialDataUrl = 'http://localhost:3002/data/initData.json';
// Model
const todoModel = new TodoModel();
const foldModel = new FoldModel();

// View
new InputView(todoModel);
new ListView(todoModel, foldModel);
new ListFoldButtonView(foldModel);