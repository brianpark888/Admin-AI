"use client";
import React, { useState } from "react";
import Button from "./Button";
import TodoItem from "./ListItem";
import 'tailwindcss/tailwind.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [taskClass, setTaskClass] = useState("--Class--");
  const [description, setDescription] = useState("");

  const addTodo = () => {
    if (input.trim() === "" || taskClass === "--Class--") return;
    const newTodo = {
      id: Date.now(), // Simple ID generation based on timestamp
      text: input,
      completed: false,
      taskClass,
      description,
    };
    setTodos([...todos, newTodo]);
    setInput("");
    setDescription("");
    setTaskClass("--Class--");
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <div className="max-w-2xl mx-auto my-4 p-8 bg-white rounded shadow-xl">
      <h1 className="font-bold text-6xl sm:text-4xl py-4">My Todo List</h1>
      <p className="my-2 font-bold text-lg">Task:</p>
      <div className="text-center">
        <div className="title-description">
          <input
            type="text"
            className="w-3/12 px-4 py-2 mb-4 mx-2 rounded border-2 border-black align-top"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input 
            type="text" 
            className="w-8/12 px-4 py-2 mb-4 rounded border-2 border-black align-top" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <select
            name="taskClass"
            className="w-5/12 px-4 py-2 my-0.5 mb-4 mx-2 rounded border-2 border-black align-top"
            value={taskClass}
            onChange={(e) => setTaskClass(e.target.value)}
          >
            <option value="--Class--">--Class--</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="School">School</option>
            <option value="Other">Other</option>
          </select>
          <Button className="my-0.5" onClick={addTodo}>Add</Button>
        </div>
      </div>
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
