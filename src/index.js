import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import * as actions from "./store/actions";
import { initiateStore } from "./store/store";

const store = initiateStore();

const App = () => {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.subscribe(() => setState(store.getState()));
  }, []);

  const complitedTask = (taskId) => {
    store.dispatch(actions.taskComplited(taskId));
  };
  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChange(taskId));
  };

  return (
    <>
      {" "}
      <h1>app</h1> <button onClick={complitedTask}>Complited</button>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            {" "}
            <p>{el.title}</p> <p>{`Complited:${el.complited}`}</p>
            <button onClick={() => complitedTask(el.id)}>complited</button>
            <button onClick={() => changeTitle(el.id)}>changed title</button>
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
    <App />
  </React.StrictMode>
);
