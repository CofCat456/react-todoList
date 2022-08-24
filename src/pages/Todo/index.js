import { useState, useEffect, useCallback } from 'react';

import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Loading from '../../components/Loading';
import MySwal from '../../components/Swql';

import TodoList from './components/TodoList';
import TodoListTab from './components/TodoListTab';

import {
    GetTodosApi,
    AddTodoApi,
    deleteTodoApi,
    toggleTodoApi,
} from '../../global/todoApi';

import { getUserData, clearUserData } from '../../global/constants';

import nullTodo from '../../assets/images/nullTodo.png';
import logo from '../../assets/images/logo.png';

const Logout = () => {
    clearUserData();
};

const Todo = () => {
    const [isLoading, setLoading] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [filteredTodoList, setFilteredTodoList] = useState([]);
    const [status, setStatus] = useState('全部');
    const [todoData, setTodoData] = useState('');

    const { nickname: name = '' } = getUserData();

    const todoTabList = ['全部', '待完成', '已完成'];

    const todoDataHandler = (e) => {
        setTodoData(e.target.value);
    };

    const fetchGetTodos = useCallback(() => {
        const fetchingGetTodos = async () => {
            const res = await GetTodosApi();
            const data = await res.json();

            const { status } = res;
            const { todos, message = '' } = data;

            setLoading(false);

            if (status === 200) {
                setTodoList(todos);
            } else if (status === 401) {
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    title: message,
                });
            }
        };

        fetchingGetTodos();
    }, []);

    const fetchAddTodo = async () => {
        setLoading(true);
        setTodoData('');

        if (todoData === '') {
            setLoading(false);
            MySwal.fire({
                icon: 'error',
                showConfirmButton: false,
                title: '請輸入代辦事項！',
            });
            return;
        }

        const res = await AddTodoApi({
            content: todoData,
        });

        setLoading(false);

        const { status } = res;

        if (status === 201) {
            fetchGetTodos();

            MySwal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                title: '代辦事項新增成功！',
            });
        } else if (status === 401) {
            MySwal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                title: '代辦事項新增失敗ＱＱ',
            });
        }
    };

    const fetchDelTodo = async (id) => {
        setLoading(true);

        const res = await deleteTodoApi(id);

        setLoading(false);

        const { status } = res;

        if (status === 200) {
            fetchGetTodos();

            MySwal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                title: '代辦事項刪除成功！',
            });
        } else if (status === 401) {
            MySwal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                title: '代辦事項刪除失敗ＱＱ',
            });
        }
    };

    const fetchToggleTodo = async (id) => {
        setLoading(true);
        const res = await toggleTodoApi(id);
        const data = await res.json();

        setLoading(false);

        const { status } = res;
        const { content, completed_at } = data;

        if (status === 200) {
            fetchGetTodos();
            if (completed_at === null) {
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    title: `${content} 切換成待完成`,
                });
            } else {
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    title: `${content} 切換成完成`,
                });
            }
        } else if (status === 401) {
            MySwal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                title: '代辦事項切換失敗ＱＱ',
            });
        }
    };

    const clearCompletedTodo = async () => {
        setLoading(true);
        let completedIdList = todoList.filter((item) => item.completed_at);

        if (completedIdList.length === 0) {
            setLoading(false);
            MySwal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                title: '目前沒有完成項目唷！',
            });
        }

        for (const item of completedIdList) {
            const { id } = item;

            fetchDelTodo(id);
        }
    };

    const filterHandler = () => {
        switch (status) {
            case '待完成':
                setFilteredTodoList(
                    todoList.filter((item) => !item.completed_at)
                );
                break;
            case '已完成':
                setFilteredTodoList(
                    todoList.filter((item) => item.completed_at)
                );
                break;
            default:
                setFilteredTodoList(todoList);
                break;
        }
    };

    const countCompleted = () => {
        return todoList.filter(
            (item) =>
                typeof item.completed_at ===
                (status === '已完成' ? 'String' : 'object')
        ).length;
    };

    useEffect(() => {
        filterHandler();
    }, [status, todoList]);

    useEffect(() => {
        setLoading(true);
        fetchGetTodos();

        MySwal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            title: `${name} 登入成功！`,
        });
    }, [fetchGetTodos]);

    return (
        <div id='todoListPage' className='vh-100 bg-half'>
            <nav>
                <h1>
                    <NavLink to='/Todo'>
                        <img src={logo} alt='LogoImg' />
                    </NavLink>
                </h1>
                <ul>
                    <li className='todo_sm'>
                        <a>{name ? <span>{name} 的代辦</span> : ''}</a>
                    </li>
                    <li>
                        <NavLink to='/' onClick={Logout}>
                            登出
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className='conatiner todoListPage vhContainer'>
                <div className='todoList_Content'>
                    <div className='inputBox'>
                        <input
                            type='text'
                            value={todoData}
                            onChange={todoDataHandler}
                            placeholder='請輸入待辦事項'
                        />
                        <a onClick={fetchAddTodo}>
                            <FontAwesomeIcon icon={faPlus} />
                        </a>
                    </div>
                    {todoList?.length > 0 ? (
                        <div className='todoList_list'>
                            <ul className='todoList_tab'>
                                {todoTabList.map((item) => (
                                    <TodoListTab
                                        key={item}
                                        item={item}
                                        status={status}
                                        setStatus={setStatus}
                                    />
                                ))}
                            </ul>
                            <div className='todoList_items'>
                                <TodoList
                                    filteredTodoList={filteredTodoList}
                                    deleteTodo={fetchDelTodo}
                                    ToggleTodo={fetchToggleTodo}
                                />
                                <div className='todoList_statistics'>
                                    <p>
                                        {countCompleted()} 個
                                        {status === '已完成'
                                            ? '已完成'
                                            : '待完成'}
                                        項目
                                    </p>
                                    <a onClick={clearCompletedTodo}>
                                        清除已完成項目
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='nullTodo'>
                            <p>目前尚無待辦事項</p>
                            <img src={nullTodo} />
                        </div>
                    )}
                </div>
            </div>
            {isLoading ? <Loading /> : ''}
        </div>
    );
};

export default Todo;
