import React from "react";

const Todo = ({
  todos,
  newTodoText,
  setNewTodoText,
  handleSubmit,
  handleToggleComplete,
  handleDeleteTodo,
  handleEditTodo,
}) => {
  const NoTodoFound = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>No Todos Found.</h1>;
      </div>
    );
  };

  return (
    <div className="container">
      <div style={{ display: "flex", gap: 10 }}>
        <input
          type="search"
          placeholder="Enter Todo"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {todos.length === 0 ? (
        <NoTodoFound />
      ) : (
        <ol>
          {todos.map((todo) => (
            <div
              key={todo.id}
              style={{ display: "flex", gap: 10, marginBottom: 20 }}
            >
              <div>
                <li
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </li>
              </div>

              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <button onClick={() => handleEditTodo(todo)}>Edit</button>
                <button onClick={() => handleToggleComplete(todo.id)}>
                  {todo.completed ? "Undo" : "Complete"}
                </button>
                <button onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Todo;
