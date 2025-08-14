import './styles/App.scss';
import { useState, useEffect, ChangeEvent } from 'react';
import TodoList from './components/todo-list';
import InputFiled from './components/input-field';
import {addNewTodo, fetchTodos} from './store/api-actions'
import TodoFilter from './components/todo-filter';
import { State, useAppDispatch, useAppSelector } from './types/types';
import { toggleEditStatus } from './store/todo-slice';
import Header from './components/header';

function App() {
  const [text, setText] = useState('');
  const {status, error} = useAppSelector((state: State) => state.tasks);

  const dispatch = useAppDispatch();

  const addTask = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault()
    dispatch(addNewTodo(text));
    setText('');
  }

  useEffect(() => {
    dispatch(fetchTodos());

    const handleEscDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(toggleEditStatus(null));
      }
    };

    document.addEventListener('keydown', handleEscDown);
    return () => document.removeEventListener('keydown', handleEscDown);
  }, [dispatch]);

  return (
    <div className="app-page">

      {status === 'loading' && <h2>Loading in process...</h2>}
      {error && <h2>Error occured! {error}</h2>}
      <Header />
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
