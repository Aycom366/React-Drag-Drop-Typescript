import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../model";
import SingleTo from "./SingleTo";
import "./styles.css";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({
  todos,
  setTodos,
  setCompletedTodos,
  completedTodos,
}: Props) => {
  return (
    <div className="container">
      {/* The todos container is a droppable area */}
      {/* DroppableId is required to know the area */}
      <Droppable droppableId={"TodosList"}>
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver && "dragactive"}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.map((todo, index) => {
              //The SingleTo is a droppable item
              return (
                <SingleTo
                  index={index}
                  todo={todo}
                  setTodos={setTodos}
                  todos={todos}
                  key-={todo.id}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId={"TodosRemove"}>
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver &&
              //This dragcomplete is our own custom css that we would write
              "dragcomplete"
            }  `}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map((todo, index) => {
              //The SingleTo is a droppable item
              return (
                <SingleTo
                  index={index}
                  todo={todo}
                  setTodos={setCompletedTodos}
                  todos={completedTodos}
                  key-={todo.id}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
