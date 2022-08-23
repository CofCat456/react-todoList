const TodoListTab = ({ item, status, setStatus }) => {
    const statusHandler = () => {
        setStatus(item);
    };

    return (
        <li onClick={statusHandler}>
            <a className={status === item ? 'active' : ''}>{item}</a>
        </li>
    );
};

export default TodoListTab;
