import './styles/App.scss';
import { useState, useEffect } from 'react';
import TodoList from './components/todo-list';
import InputFiled from './components/input-field';

import {addNewTodo, fetchTodos} from './store/api-actions'
import TodoFilter from './components/todo-filter';
import { State, useAppDispatch, useAppSelector } from './types/types';

function App() {
  const [text, setText] = useState('');
  const {status, error} = useAppSelector((state: State) => state.tasks);
  const dispatch = useAppDispatch();

  const addTask = () => {
    dispatch(addNewTodo(text));
    setText('');
  }

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  
  return (
    <div className="App">

      {status === 'loading' && <h2>Loading in process...</h2>}
      {error && <h2>Error occured! {error}</h2>}

      <TodoList />
      <TodoFilter />
      <InputFiled
        text={text}
        handleInput={setText}
        handleSubmit={addTask} />
    </div>
  );
}

export default App;
