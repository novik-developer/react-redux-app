import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./error";

const initialState = { entities: [], isLoading: true };

//reducer

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elemIndex = state.entities.findIndex(
        (elem) => elem.id === action.payload.id
      );
      state.entities[elemIndex] = {
        ...state.entities[elemIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      return state.entities.filter((elem) => elem.id !== action.payload.id);
    },
    taskRequested(state, action) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.isLoading = false;
    },
    create(state, action) {
      state.entities.unshift(action.payload);
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recived, taskRequested, taskRequestFailed, create } =
  actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(recived(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
    console.log("error", error);
  }
};

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};

export const createTask = () => async (dispatch, getState) => {
  try {
    const data = await todosService.getTask({
      title: "NEW TASK",
      completed: false,
    });
    dispatch(create(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

//actions

export function titleChange(id) {
  return update({ id, title: `new title for ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

//selector

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
