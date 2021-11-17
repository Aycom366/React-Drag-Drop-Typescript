import React, { useRef } from "react";
import "./styles.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;

  //funtion returning void
  handleAdd: (e: React.FormEvent) => void;
}

//React.Fc<Props> is not really neccasry
const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }: Props) => {
  //ref means getting something like document.getelement by id or classname
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
      className="input"
    >
      <input
        value={todo}
        ref={inputRef}
        onChange={(e) => setTodo(e.target.value)}
        type="text"
        placeholder="Enter a task"
        className="input__box"
      />
      <button className="input__submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
