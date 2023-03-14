import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  titleChange,
  taskDeleted,
  completeTask,
  getTasks,
  loadTasks,
  getTasksLoadingStatus,
} from "./store/task";
import configureStore from "./store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getError } from "./store/error";

const store = configureStore();

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChange(taskId));
  };
  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };

  if (isLoading) {
    return <h3>...Loading</h3>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {" "}
      <h1>app</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            {" "}
            <p>{el.title}</p> <p>{`Completed:${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              complete
            </button>
            <button onClick={() => changeTitle(el.id)}>changed title</button>
            <button onClick={() => deleteTask(el.id)}>Delete Tsk</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
