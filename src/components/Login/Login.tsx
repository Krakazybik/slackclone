import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/login';
import { selectToken } from '../../store/selectors';

const LoginFormSchema = Yup.object().shape({
  login: Yup.string().required().max(16).min(3),
  password: Yup.string().required().max(16).min(3),
});

interface LoginFormValues {
  login: string;
  password: string;
}

const Login: React.FC = () => {
  const jwtToken = useSelector(selectToken);
  const dispatch = useDispatch();

  const handleSubmit = async ({ login, password }: LoginFormValues) => {
    dispatch(loginUser({ login, password }));
  };

  return (
    <div>
      {jwtToken && <Redirect to="/channels" />}
      <Formik
        initialValues={{ login: '', password: '' }}
        validationSchema={LoginFormSchema}
        onSubmit={(values: LoginFormValues) => handleSubmit(values)}
      >
        <Form>
          <label htmlFor="login">Логин: </label>
          <Field id="login" name="login" placeholder="Login" type="text" />
          <label htmlFor="password">Пароль: </label>
          <Field
            id="password"
            name="password"
            placeholder="Password"
            type="password"
          />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
