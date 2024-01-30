import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';
import { Todo } from '../../models/Todo';


interface TodoListProps {
    todos: Todo[];
    onDragEnd: (result: DropResult) => void;
    updateChecked: (id: string, isChecked: boolean) => void;
    updateTodo: (id: string, newText: string) => void;
    removeTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
    todos,
    onDragEnd,
    updateChecked,
    updateTodo,
    removeTodo,
}) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todos">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {todos.map((todo, index) => (
                            <TodoItem
                                key={todo.id!}
                                todo={todo}
                                index={index}
                                updateChecked={updateChecked}
                                updateTodo={updateTodo}
                                removeTodo={removeTodo}
                            />
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default TodoList;
