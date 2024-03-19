import { useAppSelector, useAppDispatch } from 'src/common/hooks/useReduxHooks';
// Actions are pulled straight from the export of the Reducer
import { todoAdded } from './TodosReducer';
import { useState } from 'react';

const TodoActions = () => {
    // Not all state has to be run through the Redux Store
    const [text, setText] = useState('');
    // Selectors are used to access the value in the Redux Store
    // The action dispatch function is pulled in from the custom Redux hook
    const dispatch = useAppDispatch();

    // Selectors are used to access the value in the Redux Store
    const todos = useAppSelector((state) => state.todos);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Dispatches take in the action they are handling as an argument.
        // The values passed into the action are handled in the action.payload parameter.
        dispatch(todoAdded({ todo: text, id: todos.ids.length, completed: true }));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter Todo Text:
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                </label>
                <input type="submit" />
            </form>
            <TodoList />
        </div>
    );
};

const TodoList = () => {
    const todos = useAppSelector((state) => state.todos);

    return (
        <div>
            {Object.values(todos.entities).map((todo) => (
                <div key={`toDoId${todo.id}`}>
                    <div>
                        <p>{`${todo.id}: ${todo.todo}`}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TodoActions;
