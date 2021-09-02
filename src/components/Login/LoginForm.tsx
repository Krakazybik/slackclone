import { Field, Form } from 'react-final-form';
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Login.module.scss';
import Input from '../tools/Input';
import { loginUser } from '../../store/login';

export interface ILoginFormValues {
  login: string;
  password: string;
  registration: boolean;
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogin = async ({
    login,
    password,
    registration,
  }: ILoginFormValues) => {
    dispatch(loginUser({ login, password, registration }));
  };

  return (
    <Form
      onSubmit={handleLogin}
      validate={(values) => {
        const errors: any = {};
        if (!values.login) {
          errors.login = '* Обязательное поле';
        }
        if (!values.password) {
          errors.password = '* Обязательное поле';
        }
        return errors;
      }}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <Field name="login">
            {({ input, meta }) => (
              <div>
                <Input width={300} placeholder="Логин" input={input} />
                <div className={styles.error}>
                  {meta.error && meta.touched && meta.error}
                </div>
              </div>
            )}
          </Field>

          <Field name="password">
            {({ input, meta }) => (
              <div>
                <Input
                  width={300}
                  placeholder="Пароль"
                  input={input}
                  type="password"
                />
                <div className={styles.error}>
                  {meta.error && meta.touched && meta.error}
                </div>
              </div>
            )}
          </Field>

          <div className={styles.button}>
            <button
              type="submit"
              onClick={() => form.change('registration', false)}
            >
              Войти
            </button>
            <button
              type="submit"
              onClick={() => form.change('registration', true)}
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
      )}
    />
  );
};
export default LoginForm;
