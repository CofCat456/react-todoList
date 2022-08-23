import { useEffect } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import MySwal from '../../../components/Swql';

import { setUserData, getUserData } from '../../../global/constants';

import { LoginApi } from '../../../global/todoApi';

import FormInput from './FormInput';

const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fetchLogin = async (user) => {
        const res = await LoginApi(user);
        const data = await res.json();

        const { headers, status } = res;
        const { nickname, error } = data;

        const authorization = headers.get('authorization');

        if (status === 200) {
            setUserData({
                nickname,
                authorization,
            });

            navigate('/Todo');
        } else if (status === 401) {
            MySwal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                title: error,
            });
        }
    };

    useEffect(() => {
        if (getUserData() !== null) {
            navigate('/Todo');
        }
    }, []);

    const formInputList = [
        {
            type: 'text',
            id: 'email',
            placeholder: '請輸入 Email',
            verify: {
                required: { value: true, message: '此欄位必填' },
                pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: '不符合 Email 規則',
                },
            },
            labelText: 'Email',
        },
        {
            type: 'password',
            id: 'password',
            placeholder: '請輸入密碼',
            verify: {
                required: { value: true, message: '此欄位必填' },
            },
            labelText: '密碼',
        },
    ];

    return (
        <>
            <form className='formControls' onSubmit={handleSubmit(fetchLogin)}>
                <h2 className='formControls_txt'>最實用的線上代辦事項服務</h2>
                {formInputList.map((item) => (
                    <FormInput
                        key={item.id}
                        item={item}
                        register={register}
                        errors={errors}
                    />
                ))}
                <input
                    className='formControls_btnSubmit'
                    type='submit'
                    value='登入'
                />
                <NavLink className='formControls_btnLink' to='/register'>
                    註冊帳號
                </NavLink>
            </form>
        </>
    );
};

export default Login;
