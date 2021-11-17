import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";

//creating a functional component
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");

  //creating a state for an array
  const [todos, setTodos] = useState<Todo[]>([]);

  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo) return;
    setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
    setTodo("");
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    //if the drag is the same as the destination
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todos,
      complete = completedTodos;

    //check source
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    //adding to destination
    if (destination.droppableId === "TodosList") {
      //add to destination, dont remove anything, add
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <div className="heading">Taskify</div>
        <InputField todo={todo} handleAdd={handleAdd} setTodo={setTodo} />
        <TodoList
          todos={todos}
          setCompletedTodos={setCompletedTodos}
          completedTodos={completedTodos}
          setTodos={setTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
