const FormInput = ({ item, register, errors }) => {
    const { type, id, placeholder, verify, labelText } = item;
    return (
        <>
            <label className='formControls_label' htmlFor='email'>
                {labelText}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                className='formControls_input'
                placeholder={placeholder}
                {...register(id, {
                    ...verify,
                })}
            />
            {errors[id] && (
                <span className='errorMsg'>{errors[id]?.message}</span>
            )}
        </>
    );
};

export default FormInput;
