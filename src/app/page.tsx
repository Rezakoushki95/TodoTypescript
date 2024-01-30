'use client'
import React, { useEffect, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import FirebaseService from '../../services/firebaseService';
import { Todo } from '../../models/Todo';
import TodoList from '../components/TodoList';

const Page: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todos = await FirebaseService.getTodos();
        setTodos(todos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addTodo = async () => {
    if (input) {
      try {
        const newTodo = await FirebaseService.addTodo(input);
        setTodos([...todos, newTodo]);
        setInput('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const removeTodo = async (id: string) => {
    try {
      await FirebaseService.removeTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  };

  const updateTodo = async (id: string, newText: string) => {
    try {
      await FirebaseService.updateTodoText(id, newText);
      setTodos((todos) =>
        todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const updateChecked = async (id: string, isChecked: boolean) => {
    try {
      await FirebaseService.updateTodoChecked(id, isChecked);
      setTodos((todos) =>
        todos.map((todo) => (todo.id === id ? { ...todo, checked: isChecked } : todo))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedTodos = Array.from(todos);
    const [reorderedItem] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, reorderedItem);

    const updatedTodos = reorderedTodos.map((todo, index) => ({
      ...todo,
      sortOrder: index,
    }));

    FirebaseService.updateTodosOrder(updatedTodos)
      .then(() => {
        setTodos(updatedTodos);
      })
      .catch((error: any) => {
        console.error('Error updating todos:', error);
      });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-[#F0EEEC]">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-8 rounded-full" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center min-h-screen h-full w-full flex-col pt-24 bg-[#F0EEEC]">
      <h1 className="mb-20 text-[46px]"> Reza&apos;s Todo</h1>
      <div className="mb-4 flex justify-center">
        <input
          placeholder="Meeting with Niels"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 mr-2 ml-11"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTodo()
            }
          }}
        />
        <div className="flex items-center h-[42px]">
          <svg className="cursor-pointer" onClick={addTodo} width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.6654 8.33398V19.0007M18.9987 13.6673H8.33203" stroke="#3B82F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1 13.6667C1 7.69555 1 4.70999 2.85499 2.85499C4.70999 1 7.69555 1 13.6667 1C19.6377 1 22.6233 1 24.4784 2.85499C26.3333 4.70999 26.3333 7.69555 26.3333 13.6667C26.3333 19.6377 26.3333 22.6233 24.4784 24.4784C22.6233 26.3333 19.6377 26.3333 13.6667 26.3333C7.69555 26.3333 4.70999 26.3333 2.85499 24.4784C1 22.6233 1 19.6377 1 13.6667Z" stroke="#3B82F6" stroke-width="1.5" />
          </svg>
        </div>
      </div>
      <TodoList
        todos={todos}
        onDragEnd={onDragEnd}
        updateChecked={updateChecked}
        updateTodo={updateTodo}
        removeTodo={removeTodo}
      />
    </div>
  );
};

export default Page;
