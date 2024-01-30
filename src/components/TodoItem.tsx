import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Todo } from '../../models/Todo';

interface TodoItemProps {
    todo: Todo;
    index: number;
    updateChecked: (id: string, isChecked: boolean) => void;
    updateTodo: (id: string, newText: string) => void;
    removeTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
    todo,
    index,
    updateChecked,
    updateTodo,
    removeTodo,
}) => {
    return (
        <Draggable key={todo.id!} draggableId={todo.id!} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="mb-2 flex justify-center"
                >
                    <div {...provided.dragHandleProps} className="flex mr-4 h-[42px] items-center mb-1 ">
                        <svg className="mr-0.5" width="5" height="19" viewBox="0 0 5 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.26974 11.6178C3.35124 11.6178 4.22797 10.7406 4.22797 9.65852C4.22797 8.57643 3.35124 7.69922 2.26974 7.69922C1.18825 7.69922 0.311523 8.57643 0.311523 9.65852C0.311523 10.7406 1.18825 11.6178 2.26974 11.6178Z" fill="#ABBAAD" />
                            <path d="M2.26974 4.75844C3.35124 4.75844 4.22797 3.88123 4.22797 2.79914C4.22797 1.71705 3.35124 0.839844 2.26974 0.839844C1.18825 0.839844 0.311523 1.71705 0.311523 2.79914C0.311523 3.88123 1.18825 4.75844 2.26974 4.75844Z" fill="#ABBAAD" />
                            <path d="M2.26974 18.4791C3.35124 18.4791 4.22797 17.6019 4.22797 16.5198C4.22797 15.4378 3.35124 14.5605 2.26974 14.5605C1.18825 14.5605 0.311523 15.4378 0.311523 16.5198C0.311523 17.6019 1.18825 18.4791 2.26974 18.4791Z" fill="#ABBAAD" />
                        </svg>
                        <svg width="5" height="19" viewBox="0 0 5 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.26974 11.6178C3.35124 11.6178 4.22797 10.7406 4.22797 9.65852C4.22797 8.57643 3.35124 7.69922 2.26974 7.69922C1.18825 7.69922 0.311523 8.57643 0.311523 9.65852C0.311523 10.7406 1.18825 11.6178 2.26974 11.6178Z" fill="#ABBAAD" />
                            <path d="M2.26974 4.75844C3.35124 4.75844 4.22797 3.88123 4.22797 2.79914C4.22797 1.71705 3.35124 0.839844 2.26974 0.839844C1.18825 0.839844 0.311523 1.71705 0.311523 2.79914C0.311523 3.88123 1.18825 4.75844 2.26974 4.75844Z" fill="#ABBAAD" />
                            <path d="M2.26974 18.4791C3.35124 18.4791 4.22797 17.6019 4.22797 16.5198C4.22797 15.4378 3.35124 14.5605 2.26974 14.5605C1.18825 14.5605 0.311523 15.4378 0.311523 16.5198C0.311523 17.6019 1.18825 18.4791 2.26974 18.4791Z" fill="#ABBAAD" />
                        </svg>
                    </div>
                    <input
                        type="checkbox"
                        checked={todo.checked || false}
                        onChange={(e) => updateChecked(todo.id!, e.target.checked)}
                        className={"mr-2 accent-[#3B82F6]"}
                    />
                    <input
                        type="text"
                        value={todo.text!}
                        onChange={(e) => updateTodo(todo.id!, e.target.value)}
                        className="border p-2 mr-2"
                    />
                    <div className="flex items-center h-[42px]">
                        <svg onClick={() => removeTodo(todo.id!)} className="cursor-pointer" width="28px" height="28px" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path d="m19.777 35.68h1.3828l2.6328 53.367c0.027343 0.53516 0.46484 0.95312 1 0.95312h50.414c0.53125 0 0.97266-0.41797 1-0.94922l2.6328-53.367h1.3828c1.6016 0 2.9062-1.3047 2.9062-2.9062v-9.1758c0-1.6016-1.3047-2.9062-2.9062-2.9062h-14.133v-3.4375c0-4-3.2578-7.2578-7.2617-7.2578h-17.656c-4.0039 0-7.2617 3.2578-7.2617 7.2617v3.4375l-14.133-0.003907c-1.6016 0-2.9062 1.3047-2.9062 2.9062v9.1758c0 1.6016 1.3047 2.9023 2.9062 2.9023zm5.9648 52.32-2.5781-52.32h10.812l1.9531 52.32zm23.258 0h-11.066l-1.957-52.32h13.023zm13.066 0h-11.066v-52.32h13.023zm12.188 0h-10.184l1.957-52.32h10.809zm-38.344-70.738c0-2.9023 2.3594-5.2617 5.2617-5.2617h17.656c2.8984 0 5.2617 2.3594 5.2617 5.2617v3.4375l-28.18-0.003907zm-17.039 6.3398c0-0.5 0.40625-0.90625 0.90625-0.90625h60.445c0.5 0 0.90625 0.40625 0.90625 0.90625v9.1758c0 0.5-0.40625 0.90625-0.90625 0.90625h-60.445c-0.5 0-0.90625-0.40625-0.90625-0.90625z" fill="red" />
                        </svg>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TodoItem;
