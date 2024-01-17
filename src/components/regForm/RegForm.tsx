import React from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchRegUser, inpItems, regCreateAccount, useReg } from './regSlice';
import { IFormData } from 'types/TypesBase';
import ValidateForm from '../../utils/validate/validateForm';

import netflixBg from '../../resources/img/netflix_bg.jpg';
import './regForm.scss';

const RegForm = () => {
    const {validateUsername, validatePassword, validateEmail} = ValidateForm();
    const inputItems = useSelector(inpItems);
    const createdAcc = useSelector(useReg);
    const dispatch = useDispatch();

    const submitReg = (values: IFormData, form) => {
        dispatch(fetchRegUser(values) as any);
        dispatch(regCreateAccount());

        setTimeout(() => {
            dispatch(regCreateAccount());
        }, 2000)
        form.reset();
    }

    const validateReg = (values: IFormData) => {
        const errors: Partial<IFormData> = {};
        
        errors.username = validateUsername(values.username);
        errors.password = validatePassword(values.password);
        errors.email = validateEmail(values.email);

        if (values.password !== values.confirmPass) {
            errors.confirmPass = 'Password mismatch';
        }

        return errors;
    }

    return (
        <Form
            onSubmit={submitReg}
            validate={validateReg}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="reg" data-testid="registration-page">
                    <h1 className="reg__title">Netflix Roulette</h1>
                    <h2 className="reg__subtitle">Create Account</h2>
                    {createdAcc && <h3 style={{color: 'green'}}>Successfully created!</h3>}
                    {inputItems.map(item => (
                        <Field name={item.name} key={item.name}>
                            {({ input, meta }) => (
                                <div>
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                    <input type="text" {...input} placeholder={item.placeholder} className={meta.error ? "input_error" : null}/>
                                </div>
                            )}
                        </Field>
                    ))}
                    <button type="submit" className="reg__btn">Create</button>
                    <p>or <Link to='/login' data-testid="login-link"><span>Sign in</span></Link></p>

                    <div className="reg__img">
                        <img src={netflixBg} alt='background'/>
                    </div>
                </form>
            )}
        />
    )
}

export default RegForm;