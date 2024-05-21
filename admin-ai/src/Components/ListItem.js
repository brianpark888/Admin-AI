/*
  각각의 할 일 항목을 렌더링하는 컴포넌트입니다.
  각 할 일의 완료 상태에 따라 체크박스와 텍스트 스타일을 동기화하며,
  삭제 버튼을 통해 해당 할 일을 삭제할 수 있습니다.
  이 컴포넌트는 `TodoList.js`에서 사용되어 할 일 목록을 구성합니다.
*/
import React, {useState} from "react";
import 'tailwindcss/tailwind.css';
import {Button} from "./Button";

// TodoItem 컴포넌트를 정의합니다.
const TodoItem = ({ todo, onToggle, onDelete }) => {

  const [isOpen, setIsOpen] = useState(false);
  // completedDateTime 상태를 정의합니다.


  const toggleExpander = () => setIsOpen(!isOpen);

  // 각 할 일 항목을 렌더링합니다.
  return (
    <>
    <li className={`flex space-x-4 my-2 ${todo.completed ? 'bg-gray-200': 'bg-gray-50'} rounded hover:scale-105 transform transition duration-300 ease-in-out`}>
    <input type="checkbox" className="w-10 h-5 accent-pink-500" checked={todo.completed} onChange={onToggle} />
    <div className="inline-block">
      <button
        onClick={toggleExpander}
        className="expander-header flex-1 text-lg font-sans italic"
        style={{ whiteSpace: 'nowrap' }} // Prevents the button text from wrapping
      >
        {isOpen ? "▾" : "▸"}
      </button>
      <p
        className="expander-header flex-1 text-lg font-sans italic font-bold inline-block"
        style={{ textDecoration: todo.completed ? "line-through" : "none", margin: '0' }} // Removes default margins
      >
        {todo.text}
      </p>
      <div className="mx-40 inline-block">
      <Button variant="default" size="default" onClick={onDelete}>Delete</Button>
      </div>
    </div>
 
      
    </li>
    <div className="">
      
      {isOpen && (
        <div class="expander-content" className= {`${todo.completed ? 'bg-gray-100': 'bg-gray-50'}`}>
          <span className="flex-1 text-sm font-sans block ml-5"><b>- Due Time: </b>{todo.completedDateTime}</span>
          <span className="flex-1 text-sm font-sans italic ml-5">
          <b>- Task Description: </b>{todo.description}
          </span>
          
        </div>
        )}
    </div>
    </>
  );
};

// TodoItem 컴포넌트를 내보냅니다.
export default TodoItem;
