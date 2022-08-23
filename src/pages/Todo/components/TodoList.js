import Todo from './Todo';

const TodoList = ({ filteredTodoList, deleteTodo, ToggleTodo }) => {
    return (
        <ul className='todoList_item'>
            {filteredTodoList.map((item) => {
                const { id, completed_at, content } = item;
                return (
                    <Todo
                        key={id}
                        id={id}
                        completed_at={completed_at}
                        contnet={content}
                        deleteTodo={deleteTodo}
                        ToggleTodo={ToggleTodo}
                    />
                );
            })}
        </ul>
    );
};

export default TodoList;
