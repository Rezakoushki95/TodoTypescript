// firebaseService.ts
import { onValue, push, ref, remove, set, update } from 'firebase/database';
import { database } from '../firebase';
import { Todo } from '../models/Todo';

class FirebaseService {
    private static todoRef = ref(database, 'todos/');

    static async getTodos(): Promise<Todo[]> {
        return new Promise((resolve, reject) => {
            onValue(this.todoRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const sortedTodos = Object.keys(data)
                        .map((key) => data[key])
                        .sort((a, b) => a.sortOrder - b.sortOrder);
                    resolve(sortedTodos);
                } else {
                    resolve([]);
                }
            }, reject);
        });
    }

    static async addTodo(text: string): Promise<Todo> {
        try {
            const newTodoRef = push(this.todoRef);
            const newTodo = {
                id: newTodoRef.key,
                text,
                checked: false,
                sortOrder: 0,
            };
            await set(newTodoRef, newTodo);
            return newTodo;
        } catch (error) {
            throw new Error('Error adding todo');
        }
    }

    static async removeTodo(id: string): Promise<void> {
        try {
            await remove(ref(database, `todos/${id}`));
        } catch (error) {
            throw new Error('Error removing todo');
        }
    }

    static async updateTodoText(id: string, newText: string): Promise<void> {
        try {
            await update(ref(database, `todos/${id}`), { text: newText });
        } catch (error) {
            throw new Error('Error updating todo text');
        }
    }

    static async updateTodoChecked(id: string, isChecked: boolean): Promise<void> {
        try {
            await update(ref(database, `todos/${id}`), { checked: isChecked });
        } catch (error) {
            throw new Error('Error updating todo checked');
        }
    }

    static async updateTodosOrder(updatedTodos: Todo[]): Promise<void> {
        const updatePromises = updatedTodos.map((todo, index) =>
            update(ref(database, `todos/${todo.id}`), { sortOrder: index })
        );

        try {
            await Promise.all(updatePromises);
        } catch (error) {
            throw new Error('Error updating todos order');
        }
    }
}

export default FirebaseService;