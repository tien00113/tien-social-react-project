import { Button, TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as Yup from "yup"
import { loginUserAction } from '../../Redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';

const initialValues = { email: "", password: "" };

const Login = () => {
    const [formValue, setFormValue] = useState();   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (values) => {
        console.log("handle submit", values);
        dispatch(loginUserAction({ data: values }))
    };

    return (
        <>

            <Formik
                onSubmit={handleSubmit}
                // validationSchema={validationSchema} 
                initialValues={initialValues}
            >
                <Form className='space-y-5'>
                    <div className='space-y-5'>
                        <div>
                            <Field as={TextField} name='email' placeholder="Email" type="email" variant="outlined" fullWidth />
                            <ErrorMessage name='email' component={"div"} className='text-red-500' />
                        </div>
                        <div>
                            <Field as={TextField} name='password' placeholder="Password" type="password" variant="outlined" fullWidth />
                            <ErrorMessage name='password' component={"div"} className='text-red-500' />
                        </div>
                    </div>
                    <Button sx={{ paddingP: ".8rem 0rem" }} fullWidth type='submit' variant='contained' color='primary'>Đăng Nhập</Button>
                </Form>
            </Formik>
            <div className="flex gap-2 items-center justify-center">
                <p>Chưa có tài khoản ?</p>
                <Button onClick={() => navigate("/register")}>Đăng Ký</Button>
            </div>
        </>
    )
}

export default Login