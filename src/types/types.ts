import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import store from "../store";
import { Filter } from "../const";

export type Todo = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
};

export type Todos = Todo[];

export type State = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export type FilterType = typeof Filter[keyof typeof Filter];

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector:TypedUseSelectorHook<State> = useSelector;