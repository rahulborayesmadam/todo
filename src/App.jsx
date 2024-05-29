import React, { useEffect, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";

const url = "https://jsonplaceholder.typicode.com/todos?_limit=10";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [newTodoText, setNewTodoText] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoader(false);
        setTodos(data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTodo) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editTodo.id ? { ...editTodo, title: newTodoText } : todo
      );
      setTodos(updatedTodos);
      setEditTodo(null);
    } else {
      const newTodo = { id: Date.now(), title: newTodoText, completed: false };
      setTodos([newTodo, ...todos]);
    }
    setNewTodoText("");
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setNewTodoText(todo.title);
  };

  if (loader) {
    return (
      <div className="d-flex">
        <h1>Loading..</h1>;
      </div>
    );
  }

  return (
    <div>
      <h1 className="d-flex">Todos</h1>
      <Todo
        todos={todos}
        newTodoText={newTodoText}
        setNewTodoText={setNewTodoText}
        handleSubmit={handleSubmit}
        handleToggleComplete={handleToggleComplete}
        handleDeleteTodo={handleDeleteTodo}
        handleEditTodo={handleEditTodo}
      />
    </div>
  );
};

export default App;
