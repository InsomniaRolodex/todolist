import { ChangeEvent, JSX } from 'react';

type InputFiledProps = {
    text: string,
    handleInput: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit: (evt: ChangeEvent<HTMLFormElement>) => void
}

const InputFiled = ({text, handleInput, handleSubmit}: InputFiledProps): JSX.Element => {
    return (
        <form className='new-todo' action='https://jsonplaceholder.typicode.com/todos/' method='post' onSubmit={handleSubmit} >
            <label className='new-todo__lable'>
                <input className='new-todo__input' type='text' value={text} onChange={(evt) => handleInput(evt.target.value)} />
            </label>
            <button className='new-todo__submit' type='submit'>Add Todo</button>
        </form>
    )
}

export default InputFiled;