import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [todoItems, setTodoItems] = useState(() => {
    const savedData = localStorage.getItem("todoItems");
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      return [];
    }
  });

  const [todo, setTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }, [todoItems]);

  function handleIInputChange(e) {
    setTodo(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodoItems([
        ...todoItems,
        {
          id: todoItems.length + 1,
          text: todo.trim(),
        },
      ]);
    }
    // clear out the input box
    setTodo("");
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          name="todo"
          type="text"
          placeholder="Create a new todo"
          value={todo}
          onChange={handleIInputChange}
        />
      </form>
      <ul className="todo-list">
        {todoItems.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
