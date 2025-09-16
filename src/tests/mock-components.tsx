
import { Provider } from "react-redux";
import { Filter } from "../const";
import { todosProcess } from "../store/todo-slice";
import { Todos } from "../types/types";
import { ChangeEvent, JSX, useState } from "react";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../store/todo-slice';
import InputFiled from "../components/input-field";

export const mockTodos: Todos = [{
    userId: 1,
    id: 2,
    title: 'todo1',
    completed: true
},
{
    userId: 3,
    id: 4,
    title: 'todo2',
    completed: false
},]

export const mockState: todosProcess = {
    todos: mockTodos,
    status: "fulfilled",
    error: false,
    filterStatus: Filter.All,
    isEditing: null,
    sendingId: null,
};

export const wrappedComponent = (children: JSX.Element) => {
    const mockStore = configureStore({
        reducer: {
            tasks: todoReducer
        }
    });

    return <Provider store={mockStore}>
        {children}
    </Provider>
}

export const WrappedInputField = () => {
  const [text, setText] = useState('');


  const handleSubmit = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log('Submitted:', text);
  };
  
  return (
    <InputFiled 
      text={text}
      handleInput={setText}
      handleSubmit={handleSubmit}
    />
  );
};