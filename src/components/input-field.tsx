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
                <input className='new-todo__input'
                name='new-todo'
                type='text' 
                value={text} 
                onChange={(evt) => handleInput(evt.target.value)} 
                placeholder='Type your new todo here...'
                required/>
            </label>
            <button className='new-todo__submit' type='submit'>
                <span className='visually-hidden'>Add Todo</span>
            </button>
        </form>
    )
}

export default InputFiled;