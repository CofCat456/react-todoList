const todo = ({ id, completed_at, contnet, deleteTodo, ToggleTodo }) => {
    return (
        <li>
            <label className='todoList_label'>
                <input
                    className='todoList_input'
                    type='checkbox'
                    defaultChecked={completed_at === null ? false : true}
                    onClick={() => ToggleTodo(id)}
                ></input>
                <span>{contnet}</span>
            </label>
            <a onClick={() => deleteTodo(id)}></a>
        </li>
    );
};

export default todo;
