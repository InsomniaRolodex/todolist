import { JSX } from "react";

type InputFiledProps = {
    text: string,
    handleInput: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit: () => void
}

const InputFiled = ({text, handleInput, handleSubmit}: InputFiledProps): JSX.Element => {
    return (
        <label>
            <input type="text" value={text} onChange={(evt) => handleInput(evt.target.value)} />
            <button onClick={handleSubmit}>Add Todo</button>
        </label>
    )
}

export default InputFiled;