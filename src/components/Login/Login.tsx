import { Field, Form, Formik } from "formik"
import React, { useState } from "react"
import * as Yup from "yup"
import { Redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import SlackAPI from "../../api/slack"
import { updateToken } from "../../store/login"
import selectToken from "../../store/login-selector"

const LoginFormSchema = Yup.object().shape({
  login: Yup.string().required().max(16).min(3),
  password: Yup.string().required().max(16).min(3),
})

interface LoginFormValues {
  login: string
  password: string
}

const Login: React.FC = () => {
  const [loginError, setLoginError] = useState("")
  const jwtToken = useSelector(selectToken)
  const dispatch = useDispatch()

  const handleSubmit = async ({ login, password }: LoginFormValues) => {
    try {
      const authToken: string = await SlackAPI.login(login, password)
      dispatch(updateToken(authToken))
    } catch (err) {
      console.warn(err)
      setLoginError(`Ошибка авторизации`)
    }
  }

  return (
    <div>
      <span>{loginError}</span>
      {jwtToken && <Redirect to="/" />}
      <Formik
        initialValues={{ login: "", password: "" }}
        validationSchema={LoginFormSchema}
        onSubmit={(values: LoginFormValues) => handleSubmit(values)}
      >
        <Form>
          <Field name="login" placeholder="Login" type="text" />
          <Field name="password" placeholder="Password" type="password" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
