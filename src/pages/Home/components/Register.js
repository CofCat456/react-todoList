import { NavLink } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import MySwal from '../../../components/Swql';

import { RegisterApi } from '../../../global/todoApi';

import FormInput from './FormInput';

const Register = () => {
    const { register, handleSubmit, watch, formState } = useForm();

    const { errors } = formState;

    const fetchRegister = async (user) => {
        const res = await RegisterApi(user);
        const data = await res.json();

        const { status } = res;
        const { message, error } = data;

        if (status === 201) {
            MySwal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                title: message,
            });
        } else if (status === 422) {
            let errorMsg = '';

            for (const item of error) {
                errorMsg += item + ' ';
            }

            MySwal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                title: message,
                text: errorMsg,
            });
        }
    };

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
            type: 'text',
            id: 'nickname',
            placeholder: '請輸入您的暱稱',
            verify: {
                required: { value: true, message: '此欄位必填' },
            },
            labelText: '您的暱稱',
        },
        {
            type: 'password',
            id: 'password',
            placeholder: '請輸入密碼',
            verify: {
                required: { value: true, message: '此欄位必填' },
                minLength: {
                    value: 6,
                    message: '密碼 字數太少，至少需要 6 個字',
                },
            },
            labelText: '密碼',
        },
        {
            type: 'text',
            id: 'password2',
            placeholder: '請再次輸入密碼',
            verify: {
                required: { value: true, message: '此欄位必填' },
                validate: (value) =>
                    value === watch('password', '') ||
                    '兩次密碼輸入不同，請重新確認',
            },
            labelText: '再次輸入密碼',
        },
    ];

    return (
        <>
            <form
                className='formControls'
                onSubmit={handleSubmit(fetchRegister)}
            >
                <h2 className='formControls_txt'>註冊帳號</h2>
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
                    value='註冊帳號'
                />
                <NavLink className='formControls_btnLink' to='/login'>
                    登入
                </NavLink>
            </form>
        </>
    );
};

export default Register;
