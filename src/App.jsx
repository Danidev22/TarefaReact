import { useState, useEffect } from "react";

import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

import "./App.css";


function App() {

  const [todos, setTodos] = useState([]);

  const addTodo = (text, category) => {
    const newTodos = [...todos,
      {
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isCompleted: false,
      },
    ];

    setTodos(newTodos);
    localStorage.setItem("local", JSON.stringify(newTodos));
  };

  const removeTodo = (id) => {
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter((todo) =>
     todo.id !== id ? todo : null
    );
    setTodos(filteredTodos);
    localStorage.setItem("local", JSON.stringify(filteredTodos));

  };

 const completeTodo = (id) => {
  const newTodos = [...todos]
  newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo);
  setTodos(newTodos);
  localStorage.setItem("local", JSON.stringify(newTodos));

 };

 useEffect(() => {
  // Lê os dados do LocalStorage
  const data = localStorage.getItem("local")
  
  // Verifica se os dados existem
  if (data && data !== '[]') {
    setTodos(JSON.parse(data))
  } else { 
    setTodos([ { id: 1, text: "Ir ao mercado", category: "Trabalho", isCompleted: false, }, { id: 2, text: "Ir para a igreja", category: "Pessoal", isCompleted: false, }, { id: 3, text: "Estudar React", category: "Estudos", isCompleted: false, }, ])
  }
}, []);

  return (
    <div className="app">
       <h1>Lista de Tarefas</h1>
       <div className="todo-list">
       {todos.map((todo) => (
       <Todo key={todo.id} todo={todo} removeTodo={removeTodo} completeTodo={completeTodo}/>
      ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
    );
  }

export default App;
