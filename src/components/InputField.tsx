 import React, { useState, useRef } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}
// function InputField({todo,setTodo}:Props) { 
//or

// const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {

    const InputField = ({ todo, setTodo, handleAdd }:Props) => {

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="input"
        ref={inputRef}
        value={todo}
        placeholder="Enter a task"
        onChange={(e) => setTodo(e.target.value)}
        style={{height:'40px',width:'70%',border:'2px solid blue'}}
      />
      <button style={{height:'30px !important',border:'2px solid blue',backgroundColor:'white',padding:'13px',marginLeft:'30px'}} type="submit">GO</button>
    </form>
  );
};

export default InputField;
