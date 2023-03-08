import { legacy_createStore as createStore } from "redux";
import { taskReducer } from "./taskReducer";

const initialState = [
  { id: 1, title: "Task1", complited: false },
  { id: 2, title: "Task2", complited: false },
];

export function initiateStore(params) {
  return createStore(taskReducer, initialState);
}
