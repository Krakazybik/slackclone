import { Field, Form, Formik } from "formik"
import React, { useContext, useState } from "react"
import * as Yup from "yup"
import { Redirect } from "react-router-dom"
import LoginAPI from "../../api/login"
import { JWTContext } from "../tools/contexts"

const LoginFormSchema = Yup.object().shape({
  login: Yup.string().required().max(16).min(3),
  password: Yup.string().required().max(16).min(3),
})

interface LoginFormValues {
  login: string
  password: string
}

const Login: React.FC = () => {
  const tokenContext = useContext(JWTContext)
  const [loginError, setLoginError] = useState("")

  const handleSubmit = async ({ login, password }: LoginFormValues) => {
    try {
      const authToken: string = await LoginAPI.login(login, password)
      localStorage.setItem("jwtToken", authToken)
      if (tokenContext.setJwtToken) tokenContext.setJwtToken(authToken)
    } catch (err) {
      console.warn(err)
      setLoginError(`Ошибка авторизации`)
    }
  }

  return (
    <div>
      <span>{loginError}</span>
      {tokenContext.jwtToken && <Redirect to="/" />}
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
